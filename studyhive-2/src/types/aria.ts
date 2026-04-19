import type { KnowledgeNode } from './user'

export type ARIAMode = 'strict' | 'supportive' | 'socratic' | 'strategist'

export interface ErrorPattern {
  id: string
  name: string
  description: string
  frequency: number
  subject: string
  concept: string
  triggerConditions: string[]
}

export interface ForgettingCurve {
  conceptId: string
  retentionPercent: number
  nextReviewDate: Date
  reviewCount: number
}

export interface ARIAMessage {
  id: string
  role: 'user' | 'aria'
  content: string
  timestamp: Date
  mode: ARIAMode
}

export interface ARIAProfile {
  userId: string
  errorDNA: ErrorPattern[]
  peakWindow: { start: string; end: string }
  forgettingCurves: ForgettingCurve[]
  projectedPercentile: number
  projectedPercentileCI: { low: number; high: number }
  daysToExam: number
  knowledgeGraph: KnowledgeNode[]
}
