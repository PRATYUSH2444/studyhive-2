import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User'

export interface AuthRequest extends Request {
  user?: IUser
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies?.accessToken
    
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized', code: 'NO_TOKEN' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({ error: 'User not found', code: 'USER_NOT_FOUND' })
    }

    user.updateStreak()
    await user.save()

    req.user = user
    next()
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' })
    }
    return res.status(401).json({ error: 'Invalid token', code: 'INVALID_TOKEN' })
  }
}

export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies?.accessToken
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }
      const user = await User.findById(decoded.userId)
      if (user) {
        req.user = user
      }
    }
    next()
  } catch (error) {
    next()
  }
}

export const requirePro = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.isPro || req.user?.isElite) {
    return next()
  }
  return res.status(403).json({ error: 'Pro subscription required', upgrade: true })
}

export const requireElite = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.isElite) {
    return next()
  }
  return res.status(403).json({ error: 'Elite subscription required', upgrade: true })
}
