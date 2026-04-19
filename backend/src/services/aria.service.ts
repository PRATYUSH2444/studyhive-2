import ARIAProfile from '../models/ARIAProfile'
import { geminiService } from './gemini.service'

export const ariaService = {
  updateKnowledgeGraph: async (userId: string, conceptId: string, subject: string, concept: string, isCorrect: boolean) => {
    const profile = await ARIAProfile.findOne({ userId })
    if (!profile) return

    let node = profile.knowledgeGraph.find(n => n.conceptId === conceptId)
    if (!node) {
      node = {
        conceptId, subject, concept, mastery: 'untouched',
        masteryPercent: 0, lastPracticed: new Date(),
        practiceCount: 0, correctCount: 0, connections: []
      } as any
      profile.knowledgeGraph.push(node as any)
    }

    node!.practiceCount += 1
    if (isCorrect) node!.correctCount += 1

    let prev = node!.masteryPercent
    if (isCorrect) {
      node!.masteryPercent = Math.min(100, Math.floor(prev + (20 - prev/5)))
    } else {
      node!.masteryPercent = Math.max(0, Math.floor(prev - 15))
    }

    node!.lastPracticed = new Date()
    const p = node!.masteryPercent
    if (p <= 30) node!.mastery = 'danger'
    else if (p <= 60) node!.mastery = 'untouched'
    else if (p <= 80) node!.mastery = 'shaky'
    else node!.mastery = 'mastered'

    await profile.save()
    return node
  },

  updateErrorDNA: async (userId: string, question: any, userAnswer: string, correctAnswer: string, timeSpent: number) => {
    const profile = await ARIAProfile.findOne({ userId })
    if (!profile) return

    const analysis = await geminiService.analyzeAnswer({
      question, userAnswer, correctAnswer, timeSpent,
      studentHistory: { patterns: profile.errorDNA }
    })

    let pattern = profile.errorDNA.find(p => p.name === analysis.errorType)
    if (pattern) {
      pattern.frequency += 1
      pattern.lastOccurred = new Date()
    } else {
      profile.errorDNA.push({
        patternId: Date.now().toString(),
        name: analysis.errorType,
        description: analysis.explanation,
        subject: question.subject,
        concept: analysis.conceptGap || question.concept,
        frequency: 1,
        triggerConditions: analysis.relatedConcepts || [],
        lastOccurred: new Date()
      } as any)
    }
    await profile.save()
  },

  calculateForgettingCurve: async (userId: string, conceptId: string, result: 'perfect' | 'good' | 'hard' | 'wrong') => {
    const profile = await ARIAProfile.findOne({ userId })
    if (!profile) return

    let curve = profile.forgettingCurves.find(c => c.conceptId === conceptId)
    if (!curve) {
      curve = {
        conceptId, retentionPercent: 100, lastReviewed: new Date(),
        nextReviewDate: new Date(), reviewCount: 0, easeFactor: 2.5
      } as any
      profile.forgettingCurves.push(curve as any)
    }

    curve!.reviewCount += 1
    curve!.lastReviewed = new Date()

    if (result === 'perfect') curve!.easeFactor += 0.1
    else if (result === 'hard') curve!.easeFactor -= 0.15
    else if (result === 'wrong') curve!.easeFactor = Math.max(1.3, curve!.easeFactor - 0.2)

    let nextInterval = 1
    if (curve!.reviewCount === 1) nextInterval = 1
    else if (curve!.reviewCount === 2) nextInterval = 6
    else nextInterval = Math.round(curve!.reviewCount * curve!.easeFactor * 2)

    const nextDate = new Date()
    nextDate.setDate(nextDate.getDate() + nextInterval)
    curve!.nextReviewDate = nextDate

    await profile.save()
  },

  generateDailySchedule: async (userId: string, targetPercentile: number, availableHours: number, startDate: Date, endDate: Date) => {
    // Basic wrapper to call gemini layout based on weak domains
    const profile = await ARIAProfile.findOne({ userId })
    if (!profile) return null

    const weakNodes = profile.knowledgeGraph.filter(k => k.mastery === 'danger' || k.mastery === 'shaky')
    const topics = weakNodes.map(w => w.concept).slice(0, 5)

    const schedule = [{
      type: 'Study',
      subject: weakNodes[0]?.subject || 'General',
      topic: topics[0] || 'Fundamentals',
      duration: 60,
      priority: 'high'
    }]
    return schedule
  },

  projectPercentile: async (userId: string) => {
    const profile = await ARIAProfile.findOne({ userId })
    if (!profile) return { currentProjected: 0 }
    return { currentProjected: profile.projectedPercentile || 50 }
  }
}
