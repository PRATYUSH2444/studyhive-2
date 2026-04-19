import mongoose, { Document, Model, Schema } from 'mongoose'
import { IUser } from './User'
import { IQuestion } from './Question'

interface BattleAnswer {
  questionId: mongoose.Types.ObjectId | IQuestion
  selectedIndex: number
  isCorrect: boolean
  timeSpent: number
}

interface BattlePlayer {
  userId: mongoose.Types.ObjectId | IUser
  name: string
  avatar: string
  eloRating: number
  score: number
  answers: BattleAnswer[]
  currentQuestionIndex: number
  isConnected: boolean
  finishedAt?: Date
}

interface ELOChange {
  userId: mongoose.Types.ObjectId | IUser
  change: number
  newRating: number
}

export interface IBattle extends Document {
  mode: 'oneVsOne' | 'hiveWar' | 'gauntlet' | 'blitz' | 'boss'
  status: 'waiting' | 'matchmaking' | 'active' | 'completed' | 'abandoned'
  players: BattlePlayer[]
  questions: (mongoose.Types.ObjectId | IQuestion)[]
  topic?: string
  subject?: string
  examTarget?: string
  winnerId?: mongoose.Types.ObjectId | IUser
  startedAt?: Date
  completedAt?: Date
  roomId?: string
  eloChanges: ELOChange[]
  createdAt: Date
  updatedAt: Date
}

const battleSchema = new Schema<IBattle>({
  mode: { 
    type: String, 
    enum: ['oneVsOne', 'hiveWar', 'gauntlet', 'blitz', 'boss'] 
  },
  status: { 
    type: String, 
    enum: ['waiting', 'matchmaking', 'active', 'completed', 'abandoned'],
    default: 'waiting'
  },
  players: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    avatar: String,
    eloRating: Number,
    score: { type: Number, default: 0 },
    answers: [{
      questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
      selectedIndex: Number,
      isCorrect: Boolean,
      timeSpent: Number
    }],
    currentQuestionIndex: { type: Number, default: 0 },
    isConnected: { type: Boolean, default: true },
    finishedAt: Date
  }],
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  topic: String,
  subject: String,
  examTarget: String,
  winnerId: { type: Schema.Types.ObjectId, ref: 'User' },
  startedAt: Date,
  completedAt: Date,
  roomId: String,
  eloChanges: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    change: Number,
    newRating: Number
  }]
}, { timestamps: true })

const Battle: Model<IBattle> = mongoose.models.Battle || mongoose.model<IBattle>('Battle', battleSchema)
export default Battle
