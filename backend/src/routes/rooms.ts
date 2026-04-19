import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import Room from '../models/Room'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const { type, examTarget, subject } = req.query
    const match: any = {}
    if (type) match.type = type
    if (examTarget) match.examTarget = examTarget
    if (subject) match.subject = subject

    const rooms = await Room.find(match).limit(20)
    res.json(rooms)
  } catch (err) { next(err) }
})

router.post('/create', authenticate, async (req, res, next) => {
  try {
    const { name, type, subject, examTarget, isPrivate, maxMembers } = req.body
    const room = await Room.create({
      name, type, subject, examTarget, isPrivate, maxMembers,
      hostId: req.user?._id,
      inviteCode: isPrivate ? Math.random().toString(36).substring(2, 8).toUpperCase() : undefined,
      members: [{ userId: req.user?._id, name: req.user?.name, avatar: req.user?.avatar }]
    })
    res.status(201).json({ room })
  } catch (err) { next(err) }
})

router.post('/join/:roomId', authenticate, async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomId)
    if (!room) return res.status(404).json({ error: 'Room not found' })

    const exists = room.members.find(m => m.userId.toString() === req.user?._id.toString())
    if (!exists) {
      room.members.push({ userId: req.user?._id as any, name: req.user?.name as any, avatar: req.user?.avatar as any, isActive: true, joinedAt: new Date() })
      await room.save()
    }
    res.json({ room })
  } catch (err) { next(err) }
})

router.post('/join/invite/:code', authenticate, async (req, res, next) => {
  try {
    const room = await Room.findOne({ inviteCode: req.params.code })
    if (!room) return res.status(404).json({ error: 'Invalid invite code' })

    const exists = room.members.find(m => m.userId.toString() === req.user?._id.toString())
    if (!exists) {
      room.members.push({ userId: req.user?._id as any, name: req.user?.name as any, avatar: req.user?.avatar as any, isActive: true, joinedAt: new Date() })
      await room.save()
    }
    res.json({ room })
  } catch (err) { next(err) }
})

router.delete('/leave/:roomId', authenticate, async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomId)
    if (!room) return res.status(404).json({ error: 'Room not found' })

    room.members = room.members.filter(m => m.userId.toString() !== req.user?._id.toString())
    await room.save()
    res.json({ success: true })
  } catch (err) { next(err) }
})

router.patch('/:roomId/pomodoro', authenticate, async (req, res, next) => {
  try {
    const { action, mode } = req.body
    const room = await Room.findById(req.params.roomId)
    if (!room) return res.status(404).json({ error: 'Room not found' })
    if (room.hostId?.toString() !== req.user?._id.toString()) return res.status(403).json({ error: 'Only host can control pomodoro' })

    let timeLeft = mode === 'focus' ? 25 * 60 : 5 * 60
    room.pomodoroState = {
      isRunning: action === 'start',
      mode,
      timeLeft,
      cycleCount: room.pomodoroState?.cycleCount || 0
    }
    await room.save()
    res.json({ pomodoroState: room.pomodoroState })
  } catch (err) { next(err) }
})

export default router
