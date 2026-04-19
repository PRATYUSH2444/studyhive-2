import mongoose, { Document, Model, Schema } from 'mongoose'
import { IUser } from './User'

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId | IUser
  subject: string
  topic: string
  plannedMinutes?: number
  actualMinutes: number
  questionsAttempted: number
  questionsCorrect: number
  status: 'planned' | 'active' | 'completed' | 'skipped'
  scheduledFor?: Date
  startedAt?: Date
  completedAt?: Date
  notes?: string
  ariaRating?: number
  createdAt: Date
  updatedAt: Date
}

const sessionSchema = new Schema<ISession>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  plannedMinutes: Number,
  actualMinutes: { type: Number, default: 0 },
  questionsAttempted: { type: Number, default: 0 },
  questionsCorrect: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['planned', 'active', 'completed', 'skipped'],
    default: 'planned'
  },
  scheduledFor: Date,
  startedAt: Date,
  completedAt: Date,
  notes: String,
  ariaRating: { type: Number, min: 1, max: 5 }
}, { timestamps: true })

const Session: Model<ISession> = mongoose.models.Session || mongoose.model<ISession>('Session', sessionSchema)
export default Session
