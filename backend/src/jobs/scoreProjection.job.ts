import cron from 'node-cron'
import User from '../models/User'
import Notification from '../models/Notification'
import { ariaService } from '../services/aria.service'

cron.schedule('0 0 * * *', async () => {
  try {
    const users = await User.find()
    
    for (const user of users) {
      const previous = user.projectedPercentile
      const { currentProjected } = await ariaService.projectPercentile(user._id.toString())
      user.projectedPercentile = currentProjected
      await user.save()

      if (previous - currentProjected > 5) {
        await Notification.create({
          userId: user._id,
          type: 'aria_alert',
          title: 'Percentile Drop Detected',
          message: 'ARIA noticed a drop in your projection. Review your weak topics!'
        })
      }
    }
    console.log('[Job] Score Projection completed.')
  } catch (err) {
    console.error('[Job Error] Score Projection', err)
  }
})
