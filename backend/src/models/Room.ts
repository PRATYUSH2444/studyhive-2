import mongoose, { Document, Model, Schema } from 'mongoose'
import { IUser } from './User'

interface RoomMember {
  userId: mongoose.Types.ObjectId | IUser
  name: string
  avatar: string
  joinedAt: Date
  isActive: boolean
}

export interface IRoom extends Document {
  name?: string
  type: 'silent' | 'discussion' | 'lecture' | 'battle' | 'accountability'
  hostId?: mongoose.Types.ObjectId | IUser
  members: RoomMember[]
  maxMembers: number
  isPrivate: boolean
  inviteCode?: string
  pomodoroState?: {
    isRunning: boolean
    mode: 'focus' | 'break'
    timeLeft: number
    cycleCount: number
  }
  subject?: string
  examTarget?: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

const roomSchema = new Schema<IRoom>({
  name: String,
  type: { 
    type: String, 
    enum: ['silent', 'discussion', 'lecture', 'battle', 'accountability'],
    required: true
  },
  hostId: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    avatar: String,
    joinedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
  }],
  maxMembers: { type: Number, default: 50 },
  isPrivate: { type: Boolean, default: false },
  inviteCode: String,
  pomodoroState: {
    isRunning: Boolean,
    mode: { type: String, enum: ['focus', 'break'] },
    timeLeft: Number,
    cycleCount: Number
  },
  subject: String,
  examTarget: String,
  description: String
}, { timestamps: true })

const Room: Model<IRoom> = mongoose.models.Room || mongoose.model<IRoom>('Room', roomSchema)
export default Room
