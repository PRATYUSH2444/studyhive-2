import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import Notification from '../models/Notification'

const router = Router()

router.get('/', authenticate, async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user?._id, isRead: false })
      .sort({ createdAt: -1 })
      .limit(50)
    res.json(notifications)
  } catch (err) { next(err) }
})

router.patch('/read/:id', authenticate, async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?._id },
      { $set: { isRead: true } },
      { new: true }
    )
    res.json({ notification })
  } catch (err) { next(err) }
})

router.patch('/read-all', authenticate, async (req, res, next) => {
  try {
    await Notification.updateMany(
      { userId: req.user?._id, isRead: false },
      { $set: { isRead: true } }
    )
    res.json({ success: true })
  } catch (err) { next(err) }
})

export default router
