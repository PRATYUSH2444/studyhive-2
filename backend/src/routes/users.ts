import { Router } from 'express'
import { authenticate, optionalAuth } from '../middleware/auth'
import User from '../models/User'
import Notification from '../models/Notification'

const router = Router()

router.get('/profile/:id', optionalAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-refreshToken')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ user })
  } catch (err) { next(err) }
})

router.patch('/profile', authenticate, async (req, res, next) => {
  try {
    const { name, examTarget, examDate, peakWindow } = req.body
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { $set: { name, examTarget, examDate, peakWindow } },
      { new: true }
    )
    res.json({ user })
  } catch (err) { next(err) }
})

router.get('/rank-history', authenticate, async (req, res, next) => {
  try {
    res.json([{ date: '2026-04-01', elo: 1200, rank: 'Apprentice' }, { date: '2026-04-15', elo: 1400, rank: 'Scholar' }])
  } catch (err) { next(err) }
})

router.get('/crystals', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.user?._id)
    res.json({ crystals: user?.crystals || [] })
  } catch (err) { next(err) }
})

router.post('/challenge', authenticate, async (req, res, next) => {
  try {
    const { challengedUserId, stakes, targetMetric, duration } = req.body
    const challengedUser = await User.findById(challengedUserId)
    if (!challengedUser) return res.status(404).json({ error: 'Challenged user not found' })

    await Notification.create({
      userId: challengedUserId,
      type: 'battle_invite', // Reusing type for rivalry
      title: 'New Rivalry Challenge!',
      message: `${req.user?.name} has challenged you in ${targetMetric} for ${duration} days! Stakes: ${stakes} XP.`,
      data: { challengerId: req.user?._id, stakes, targetMetric, duration }
    })
    
    res.json({ success: true, message: 'Challenge sent!' })
  } catch (err) { next(err) }
})

router.get('/rivalry', authenticate, async (req, res, next) => {
  try {
    res.json([]) // Placeholder active rivalries array
  } catch (err) { next(err) }
})

export default router
