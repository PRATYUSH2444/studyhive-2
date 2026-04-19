import mongoose, { Document, Model, Schema } from 'mongoose'
import { IUser } from './User'

interface ConversationMessage {
  role: 'user' | 'aria'
  content: string
  timestamp: Date
  mode: 'strict' | 'supportive' | 'socratic' | 'strategist'
}

export interface ForgettingCurve {
  conceptId: string
  retentionPercent: number
  lastReviewed: Date
  nextReviewDate: Date
  reviewCount: number
  easeFactor: number
}

export interface ErrorPattern {
  patternId: string
  name: string
  description: string
  subject: string
  concept: string
  frequency: number
  triggerConditions: string[]
  lastOccurred: Date
}

export interface ConceptNode {
  conceptId: string
  subject: string
  concept: string
  mastery: 'mastered' | 'shaky' | 'danger' | 'untouched'
  masteryPercent: number
  lastPracticed: Date
  practiceCount: number
  correctCount: number
  connections: string[]
}

export interface IARIAProfile extends Document {
  userId: mongoose.Types.ObjectId | IUser
  knowledgeGraph: ConceptNode[]
  errorDNA: ErrorPattern[]
  forgettingCurves: ForgettingCurve[]
  conversations: ConversationMessage[]
  peakWindow?: { start: string; end: string }
  projectedPercentile?: number
  projectedCI?: { low: number; high: number }
  dailyBriefLastGenerated?: Date
  totalARIAInteractions: number
  createdAt: Date
  updatedAt: Date
}

const ariaProfileSchema = new Schema<IARIAProfile>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  knowledgeGraph: [{
    conceptId: String,
    subject: String,
    concept: String,
    mastery: { type: String, enum: ['mastered', 'shaky', 'danger', 'untouched'] },
    masteryPercent: { type: Number, min: 0, max: 100 },
    lastPracticed: Date,
    practiceCount: Number,
    correctCount: Number,
    connections: [String]
  }],
  errorDNA: [{
    patternId: String,
    name: String,
    description: String,
    subject: String,
    concept: String,
    frequency: Number,
    triggerConditions: [String],
    lastOccurred: Date
  }],
  forgettingCurves: [{
    conceptId: String,
    retentionPercent: Number,
    lastReviewed: Date,
    nextReviewDate: Date,
    reviewCount: Number,
    easeFactor: { type: Number, default: 2.5 }
  }],
  conversations: [{
    role: { type: String, enum: ['user', 'aria'] },
    content: String,
    timestamp: Date,
    mode: { type: String, enum: ['strict', 'supportive', 'socratic', 'strategist'] }
  }],
  peakWindow: { 
    start: String, 
    end: String 
  },
  projectedPercentile: Number,
  projectedCI: { 
    low: Number, 
    high: Number 
  },
  dailyBriefLastGenerated: Date,
  totalARIAInteractions: { type: Number, default: 0 }
}, { timestamps: true })

const ARIAProfile: Model<IARIAProfile> = mongoose.models.ARIAProfile || mongoose.model<IARIAProfile>('ARIAProfile', ariaProfileSchema)
export default ARIAProfile
