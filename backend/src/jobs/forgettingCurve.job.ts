import cron from 'node-cron'
import ARIAProfile from '../models/ARIAProfile'
import Notification from '../models/Notification'

cron.schedule('0 * * * *', async () => {
  try {
    const now = new Date()
    const profiles = await ARIAProfile.find()
    
    for (const profile of profiles) {
      const dueCards = profile.forgettingCurves.filter(c => c.nextReviewDate <= now)
      if (dueCards.length > 0) {
        await Notification.create({
          userId: profile.userId,
          type: 'exam_reminder',
          title: 'Review Due!',
          message: `You have ${dueCards.length} concept(s) to review to maintain retention.`
        })
      }
    }
    console.log('[Job] Forgetting Curve calculated.')
  } catch (err) {
    console.error('[Job Error] Forgetting Curve', err)
  }
})
