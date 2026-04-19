import User from '../models/User'
import Notification from '../models/Notification'
import { CONSTANTS } from '../config/constants'

export const scoringService = {
  calculateELO: (playerRating: number, opponentRating: number, result: number) => {
    const K = 32
    const expected = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400))
    const newRating = playerRating + Math.round(K * (result - expected))
    return { newRating, change: newRating - playerRating }
  },

  awardXP: async (userId: string, amount: number, reason: string) => {
    const user = await User.findById(userId)
    if (!user) return null

    const oldRank = user.rank
    user.xp += amount
    const newRank = user.calculateRank()

    let rankChanged = false
    if (oldRank !== newRank) {
      rankChanged = true
      user.rank = newRank as any
      // Create rank up notification
      await Notification.create({
        userId: user._id,
        type: 'rank_up',
        title: 'Rank Up!',
        message: `Congratulations! You have been promoted to ${newRank}.`,
        isRead: false
      })
    }

    await user.save()
    return { newXP: user.xp, newRank: user.rank, rankChanged, xpGained: amount }
  },

  calculatePerformanceScore: (sessions: any[], accuracy: number, consistency: number) => {
    const score = (accuracy * 0.5) + (consistency * 0.3) + (sessions.length * 0.2)
    return Math.min(100, Math.max(0, score))
  }
}
