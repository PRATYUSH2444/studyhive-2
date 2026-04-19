import { Router } from 'express'
import { authenticate, requirePro } from '../middleware/auth'
import { aiLimiter } from '../middleware/rateLimit'
import { geminiService } from '../services/gemini.service'
import { redisGet, redisSet } from '../config/redis'
import ARIAProfile from '../models/ARIAProfile'

const router = Router()

router.post('/chat', authenticate, aiLimiter, async (req, res, next) => {
  try {
    const { message, mode, conversationId } = req.body
    let profile = await ARIAProfile.findOne({ userId: req.user?._id })
    if (!profile) {
      profile = await ARIAProfile.create({ 
        userId: req.user?._id, 
        projectedPercentile: 50,
        knowledgeGraph: [],
        errorDNA: [],
        forgettingCurves: [],
        conversations: []
      })
    }

    const studentProfile = {
      name: req.user?.name,
      examTarget: req.user?.examTarget,
      daysToExam: 100, // naive calc
      weakTopics: req.user?.weakTopics || [],
      recentErrors: profile.errorDNA.slice(0, 5),
      streak: req.user?.streak,
      accuracy: req.user?.accuracy,
      projectedPercentile: req.user?.projectedPercentile,
      peakWindow: req.user?.peakWindow
    }

    const aiRes = await geminiService.generateARIAResponse({
      message,
      studentProfile,
      conversationHistory: profile.conversations.slice(-10),
      mode
    })

    profile.conversations.push({ role: 'user', content: message, timestamp: new Date(), mode } as any)
    profile.conversations.push({ role: 'aria', content: aiRes.response, timestamp: new Date(), mode } as any)
    profile.totalARIAInteractions += 1
    await profile.save()

    res.json({ response: aiRes.response, suggestedFollowUps: aiRes.suggestedFollowUps, conversationId })
  } catch (err) { next(err) }
})

router.get('/daily-brief', authenticate, async (req, res, next) => {
  try {
    const userId = req.user?._id.toString()
    const cached = await redisGet(`brief:${userId}`)
    if (cached) return res.json(cached)

    // Check last generation
    const profile = await ARIAProfile.findOne({ userId })
    const today = new Date().toDateString()
    if (profile?.dailyBriefLastGenerated && profile.dailyBriefLastGenerated.toDateString() === today) {
        // Fallback if not in redis
    }

    const aiRes = await geminiService.generateDailyBrief(req.user, { count: 30, accuracy: 85 }, { subjects: ['Math'] })
    
    if (profile) {
      profile.dailyBriefLastGenerated = new Date()
      await profile.save()
    }
    await redisSet(`brief:${userId}`, JSON.stringify(aiRes), 86400)
    
    res.json(aiRes)
  } catch (err) { next(err) }
})

router.get('/knowledge-graph', authenticate, async (req, res, next) => {
  try {
    const profile = await ARIAProfile.findOne({ userId: req.user?._id })
    const sorted = profile?.knowledgeGraph?.sort((a, b) => a.masteryPercent - b.masteryPercent)
    res.json({ nodes: sorted || [] })
  } catch (err) { next(err) }
})

router.post('/crash-plan', authenticate, requirePro, async (req, res, next) => {
  try {
    const { targetPercentile, availableHoursPerDay } = req.body
    const plan = await geminiService.generateCrashPlan({
      days: 30,
      weakTopics: req.user?.weakTopics,
      hours: availableHoursPerDay || 4,
      examTarget: req.user?.examTarget || 'General'
    })
    res.json(plan)
  } catch (err) { next(err) }
})

router.get('/error-dna', authenticate, async (req, res, next) => {
  try {
    const profile = await ARIAProfile.findOne({ userId: req.user?._id })
    const sorted = profile?.errorDNA.sort((a, b) => b.frequency - a.frequency).slice(0, 10)
    res.json(sorted || [])
  } catch (err) { next(err) }
})

router.post('/generate-mindmap', authenticate, async (req, res, next) => {
  try {
    const { chapter, subject } = req.body
    const map = await geminiService.generateMindMap({ chapter, subject, examTarget: req.user?.examTarget || 'General' })
    res.json(map)
  } catch (err) { next(err) }
})

router.get('/score-prediction', authenticate, async (req, res, next) => {
  try {
    const profile = await ARIAProfile.findOne({ userId: req.user?._id })
    res.json({ current: req.user?.accuracy, projected: profile?.projectedPercentile, confidence: 85, improvement: 5 })
  } catch (err) { next(err) }
})

export default router
