import cron from 'node-cron'
import User from '../models/User'
import { emailService } from '../services/email.service'

cron.schedule('0 9 * * 0', async () => {
  try {
    const users = await User.find({ lastActiveDate: { $exists: true } })
    
    for (const user of users) {
      const report = {
        summary: `You answered ${user.totalQuestionsAnswered} questions total, reaching a ${user.accuracy}% accuracy baseline! Your currently longest streak is ${user.longestStreak}. Keep pushing your limit to reach the ${user.examTarget} goal!`
      }
      await emailService.sendWeeklyReport(user, report)
    }
    console.log('[Job] Weekly Reports distrubuted.')
  } catch (err) {
    console.error('[Job Error] Weekly Report', err)
  }
})
