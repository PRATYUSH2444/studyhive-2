import cron from 'node-cron'
import { geminiService } from '../services/gemini.service'
import { redisSet } from '../config/redis'
import Question from '../models/Question'

cron.schedule('0 6 * * *', async () => {
  try {
    const questions = await geminiService.generateExamPaper({
      examTarget: 'General',
      topics: ['Math', 'Physics', 'Chemistry', 'Biology', 'Logic'],
      difficulty: 3,
      duration: 300,
      questionCount: 5
    })
    
    const saved = await Question.insertMany(questions)
    const blitzData = {
      date: new Date().toISOString().split('T')[0],
      questions: saved.map(q => q._id)
    }

    await redisSet('daily_blitz', JSON.stringify(blitzData), 86400)
    console.log('[Job] Daily Blitz Generation completed.')
  } catch (err) {
    console.error('[Job Error] Daily Blitz', err)
  }
})
