import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import Battle from '../models/Battle'

const router = Router()

router.post('/create', authenticate, async (req, res, next) => {
  try {
    const { mode, subject, topic, examTarget } = req.body
    const battle = await Battle.create({
      mode, subject, topic, examTarget, roomId: `battle_${Date.now()}`,
      players: [{
        userId: req.user?._id,
        name: req.user?.name,
        avatar: req.user?.avatar,
        eloRating: req.user?.eloRating,
        answers: []
      }]
    })
    res.status(201).json({ battleId: battle._id, roomId: battle.roomId })
  } catch (err) { next(err) }
})

router.post('/join', authenticate, async (req, res, next) => {
  try {
    const { battleId } = req.body
    const battle = await Battle.findById(battleId)
    if (!battle) return res.status(404).json({ error: 'Battle not found' })

    battle.players.push({
      userId: req.user?._id as any,
      name: req.user?.name as any,
      avatar: req.user?.avatar as any,
      eloRating: req.user?.eloRating as any,
      score: 0,
      answers: [],
      currentQuestionIndex: 0,
      isConnected: true
    })
    
    if (battle.players.length >= 2) {
      battle.status = 'active'
    }

    await battle.save()
    res.json({ battle, player: req.user })
  } catch (err) { next(err) }
})

router.get('/history', authenticate, async (req, res, next) => {
  try {
    const battles = await Battle.find({ 'players.userId': req.user?._id }).sort({ createdAt: -1 }).limit(20)
    res.json(battles)
  } catch (err) { next(err) }
})

router.get('/leaderboard', async (req, res, next) => {
  try {
    const data = [
      { name: 'Karthik', eloRating: 2450, rank: 'Einstein' },
      { name: 'Prakash', eloRating: 2310, rank: 'Genius' }
    ] // Placeholder leaderboard
    res.json(data)
  } catch (err) { next(err) }
})

router.post('/matchmake', authenticate, async (req, res, next) => {
  try {
    // Basic matchmake simulation. Waits, then creates a bot battle.
    const battle = await Battle.create({
      mode: 'oneVsOne',
      roomId: `battle_${Date.now()}`,
      players: [
        { userId: req.user?._id, name: req.user?.name, eloRating: req.user?.eloRating, answers: [], avatar: req.user?.avatar },
        { userId: null as any, name: 'AI Challenger', eloRating: 1500, answers: [], avatar: '' }
      ],
      status: 'active'
    })
    res.json({ battleId: battle._id, opponentFound: true })
  } catch (err) { next(err) }
})

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const battle = await Battle.findById(req.params.id).populate('questions')
    if (!battle) return res.status(404).json({ error: 'Battle not found' })
    res.json(battle)
  } catch (err) { next(err) }
})

export default router
