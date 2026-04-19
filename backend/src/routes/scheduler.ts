import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import Session from '../models/Session'
import ARIAProfile from '../models/ARIAProfile'

const router = Router()

router.get('/today', authenticate, async (req, res, next) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tmrw = new Date(today)
    tmrw.setDate(today.getDate() + 1)

    const sessions = await Session.find({
      userId: req.user?._id,
      scheduledFor: { $gte: today, $lt: tmrw }
    })
    res.json(sessions || [])
  } catch (err) { next(err) }
})

router.post('/generate', authenticate, async (req, res, next) => {
  try {
    // Just create basic daily session mock integrating via aria bounds
    const { targetPercentile, availableHours, startDate, endDate } = req.body
    const s = await Session.create({
      userId: req.user?._id,
      subject: 'Generated Priority',
      topic: 'Mixed Practice',
      plannedMinutes: (availableHours || 2) * 60,
      scheduledFor: startDate ? new Date(startDate) : new Date()
    })
    res.json({ schedule: [s] })
  } catch (err) { next(err) }
})

router.patch('/session/:id', authenticate, async (req, res, next) => {
  try {
    const { status, notes } = req.body
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { $set: { status, notes } },
      { new: true }
    )
    res.json({ session })
  } catch (err) { next(err) }
})

router.get('/flashcards/due', authenticate, async (req, res, next) => {
  try {
    const profile = await ARIAProfile.findOne({ userId: req.user?._id })
    const now = new Date()
    const due = profile?.forgettingCurves.filter(c => c.nextReviewDate <= now) || []
    res.json({ flashcards: due, totalDue: due.length })
  } catch (err) { next(err) }
})

router.post('/flashcards/review', authenticate, async (req, res, next) => {
  try {
    const { flashcardId, rating } = req.body // rating 1-5
    // Here we'd call aria.calculateForgettingCurve logic
    res.json({ updated: true })
  } catch (err) { next(err) }
})

export default router
