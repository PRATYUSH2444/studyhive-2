import mongoose, { Document, Model, Schema } from 'mongoose'

interface WeakTopic {
  subject: string
  concept: string
  masteryPercent: number
  lastPracticed: Date
  mastery: 'mastered' | 'shaky' | 'danger' | 'untouched'
}

interface Crystal {
  subject: string
  concept: string
  earnedAt: Date
}

export interface IUser extends Document {
  googleId?: string
  email: string
  name: string
  avatar: string
  examTarget?: 'JEE' | 'NEET' | 'UPSC' | 'CAT' | 'GATE' | 'CLAT'
  examDate?: Date
  rank: 'Apprentice' | 'Scholar' | 'Thinker' | 'Innovator' | 'Architect' | 'Genius' | 'Einstein'
  eloRating: number
  xp: number
  streak: number
  lastActiveDate?: Date
  longestStreak: number
  projectedPercentile: number
  peakWindow?: { start: string; end: string }
  weakTopics: WeakTopic[]
  crystals: Crystal[]
  isPro: boolean
  isElite: boolean
  subscriptionExpiry?: Date
  totalQuestionsAnswered: number
  totalCorrect: number
  totalStudyMinutes: number
  battlesWon: number
  battlesTotal: number
  refreshToken?: string
  createdAt: Date
  updatedAt: Date
  accuracy: number
  calculateRank(): string
  updateStreak(): void
}

const userSchema = new Schema<IUser>({
  googleId: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  name: { type: String, required: true, trim: true },
  avatar: { type: String, default: '' },
  examTarget: { 
    type: String, 
    enum: ['JEE', 'NEET', 'UPSC', 'CAT', 'GATE', 'CLAT']
  },
  examDate: { type: Date },
  rank: { 
    type: String, 
    enum: ['Apprentice','Scholar','Thinker','Innovator','Architect','Genius','Einstein'], 
    default: 'Apprentice' 
  },
  eloRating: { type: Number, default: 1200, min: 0 },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastActiveDate: { type: Date },
  longestStreak: { type: Number, default: 0 },
  projectedPercentile: { type: Number, default: 0 },
  peakWindow: { 
    start: { type: String }, 
    end: { type: String } 
  },
  weakTopics: [{
    subject: String,
    concept: String,
    masteryPercent: Number,
    lastPracticed: Date,
    mastery: { type: String, enum: ['mastered', 'shaky', 'danger', 'untouched'] }
  }],
  crystals: [{
    subject: String,
    concept: String,
    earnedAt: Date
  }],
  isPro: { type: Boolean, default: false },
  isElite: { type: Boolean, default: false },
  subscriptionExpiry: { type: Date },
  totalQuestionsAnswered: { type: Number, default: 0 },
  totalCorrect: { type: Number, default: 0 },
  totalStudyMinutes: { type: Number, default: 0 },
  battlesWon: { type: Number, default: 0 },
  battlesTotal: { type: Number, default: 0 },
  refreshToken: { type: String, select: false },
}, { timestamps: true })

userSchema.virtual('accuracy').get(function(this: IUser) {
  if (this.totalQuestionsAnswered === 0) return 0
  return Math.round((this.totalCorrect / this.totalQuestionsAnswered) * 100)
})

userSchema.methods.calculateRank = function(this: IUser) {
  const xp = this.xp
  if (xp < 500) return 'Apprentice'
  if (xp < 1500) return 'Scholar'
  if (xp < 3500) return 'Thinker'
  if (xp < 7000) return 'Innovator'
  if (xp < 12000) return 'Architect'
  if (xp < 20000) return 'Genius'
  return 'Einstein'
}

userSchema.methods.updateStreak = function(this: IUser) {
  const today = new Date()
  const lastActive = this.lastActiveDate
  if (!lastActive) {
    this.streak = 1
    this.lastActiveDate = today
    return
  }
  
  // Set both to midnight to only compare days
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const lastActiveDateObj = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate())
  
  const diffDays = Math.floor(
    (todayDate.getTime() - lastActiveDateObj.getTime()) / (1000 * 60 * 60 * 24)
  )
  if (diffDays === 1) {
    this.streak += 1
    if (this.streak > this.longestStreak) {
      this.longestStreak = this.streak
    }
  } else if (diffDays > 1) {
    this.streak = 1
  }
  this.lastActiveDate = today
}

userSchema.pre('save', function() {
  this.rank = this.calculateRank() as any
})

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema)
export default User
