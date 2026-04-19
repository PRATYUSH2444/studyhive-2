import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import ARIAProfile from '../models/ARIAProfile'
import { authenticate } from '../middleware/auth'
import { authLimiter } from '../middleware/rateLimit'
import { emailService } from '../services/email.service'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

const router = Router()

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any })
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any })
  return { accessToken, refreshToken }
}

router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name, examTarget, examDate } = req.body
    // Optional manual mapping for UI testing 
    const user = await User.create({
      email,
      password, // Password hashed locally usually, but matching logic strictness requires mapping
      name,
      examTarget,
      examDate
    } as any)

    await ARIAProfile.create({
      userId: user._id,
      knowledgeGraph: [],
      errorDNA: [],
      forgettingCurves: [],
      conversations: [],
      totalARIAInteractions: 0
    })

    const { accessToken, refreshToken } = generateTokens(user._id.toString())
    user.refreshToken = refreshToken
    await user.save()

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })

    await emailService.sendWelcomeEmail(user)

    res.status(201).json({ user, accessToken })
  } catch (error) { next(error) }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+refreshToken')
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    
    user.updateStreak()

    const { accessToken, refreshToken } = generateTokens(user._id.toString())
    user.refreshToken = refreshToken
    await user.save()

    res.cookie('accessToken', accessToken, { httpOnly: true })
    res.json({ user, accessToken })
  } catch (error) { next(error) }
})

router.post('/refresh', async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken
    if (!token) return res.status(401).json({ error: 'No refresh token' })

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as any
    const user = await User.findById(decoded.userId).select('+refreshToken')
    
    if (!user || user.refreshToken !== token) return res.status(401).json({ error: 'Invalid refresh token' })

    const { accessToken, refreshToken } = generateTokens(user._id.toString())
    user.refreshToken = refreshToken
    await user.save()

    res.cookie('accessToken', accessToken, { httpOnly: true })
    res.cookie('refreshToken', refreshToken, { httpOnly: true })
    res.json({ accessToken })
  } catch (error) { next(error) }
})

router.post('/logout', (req, res) => {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  res.json({ success: true })
})

router.get('/me', authenticate, async (req, res, next) => {
  try {
    // req.user exists
    const profile = await ARIAProfile.findOne({ userId: (req as any).user?._id })
    res.json({ user: (req as any).user, profile })
  } catch (err) { next(err) }
})

// --- Google OAuth Strategy ---
if (process.env.GOOGLE_CLIENT_ID) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/auth/google/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id })
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails?.[0].value,
          name: profile.displayName,
          avatar: profile.photos?.[0].value || '',
          examTarget: 'JEE',
        })
        await ARIAProfile.create({ userId: user._id, knowledgeGraph: [], errorDNA: [], forgettingCurves: [], conversations: [], totalARIAInteractions: 0 })
      }
      return done(null, user)
    } catch (error) {
      return done(error as Error)
    }
  }))
}

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), (req, res) => {
  const user = req.user as any
  const { accessToken, refreshToken } = generateTokens(user._id.toString())
  res.cookie('accessToken', accessToken, { httpOnly: true })
  res.cookie('refreshToken', refreshToken, { httpOnly: true })
  
  res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/callback?token=${accessToken}`)
})

export default router
