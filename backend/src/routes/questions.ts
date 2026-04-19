import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { geminiService } from '../services/gemini.service'
import { ariaService } from '../services/aria.service'
import { scoringService } from '../services/scoring.service'
import { redisGet, redisSet } from '../config/redis'
import Question from '../models/Question'
import User from '../models/User'

const router = Router()

router.post('/generate', authenticate, async (req, res, next) => {
  try {
    const { subject, concept, difficulty, questionType, count } = req.body
    const questions = []
    
    for (let i = 0; i < (count || 1); i++) {
      const q = await geminiService.generateQuestion({
        subject, concept, difficulty, questionType,
        examTarget: req.user?.examTarget || 'General',
        errorDNA: [] // Fetch from profile realistically
      })
      questions.push(q)
    }

    const saved = await Question.insertMany(questions)
    res.json({ questions: saved })
  } catch (err) { next(err) }
})

router.get('/daily-blitz', async (req, res, next) => {
  try {
    const cached = await redisGet('daily_blitz')
    if (cached) {
      const parsed = JSON.parse(cached)
      const qs = await Question.find({ _id: { $in: parsed.questions } })
      return res.json({ questions: qs, date: parsed.date, totalParticipants: 0 })
    }
    res.status(404).json({ error: 'Blitz not ready yet' })
  } catch (err) { next(err) }
})

router.post('/daily-blitz/submit', authenticate, async (req, res, next) => {
  try {
    const { answers } = req.body // [{questionId, selectedIndex, timeSpent}]
    let score = 0
    for (const ans of answers) {
      const q = await Question.findById(ans.questionId)
      if (q && q.correctIndex === ans.selectedIndex) {
        score += 10
      }
    }
    await scoringService.awardXP(req.user!._id.toString(), score, 'Daily Blitz Complete')
    res.json({ score, rank: 1, totalParticipants: 1, analysis: 'Great job!' })
  } catch (err) { next(err) }
})

router.get('/pyq', async (req, res, next) => {
  try {
    const { subject, concept, year, difficulty, page = 1, limit = 10 } = req.query
    const match: any = { isPYQ: true }
    if (subject) match.subject = subject
    if (concept) match.concept = concept
    if (year) match.pyqYear = Number(year)
    if (difficulty) match.difficulty = Number(difficulty)

    const qs = await Question.find(match).skip((Number(page)-1)*Number(limit)).limit(Number(limit))
    res.json(qs)
  } catch (err) { next(err) }
})

router.get('/practice', authenticate, async (req, res, next) => {
  try {
    const { subject, concept, count = 10 } = req.query
    const qs = await Question.find({ subject, concept } as any).limit(Number(count))
    res.json({ questions: qs })
  } catch (err) { next(err) }
})

router.post('/answer', authenticate, async (req, res, next) => {
  try {
    const { questionId, selectedIndex, timeSpent } = req.body
    const q = await Question.findById(questionId)
    if (!q) return res.status(404).json({ error: 'Question not found' })

    const isCorrect = q.correctIndex === selectedIndex

    // Update global stat
    const u = await User.findById(req.user?._id)
    if (u) {
      u.totalQuestionsAnswered += 1
      if (isCorrect) u.totalCorrect += 1
      await u.save()
    }

    // ARIA updates
    await ariaService.updateKnowledgeGraph(req.user!._id.toString(), q.concept, q.subject, q.concept, isCorrect)
    if (!isCorrect) {
      await ariaService.updateErrorDNA(req.user!._id.toString(), q, selectedIndex.toString(), q.correctIndex.toString(), timeSpent)
    }

    let xpEarned = 0
    if (isCorrect) {
      const res = await scoringService.awardXP(req.user!._id.toString(), 10, 'Question correct')
      xpEarned = res?.xpGained || 0
    }

    res.json({ isCorrect, correctIndex: q.correctIndex, explanation: q.explanation, xpEarned, analysis: null })
  } catch (err) { next(err) }
})

export default router
