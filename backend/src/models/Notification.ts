import mongoose, { Document, Model, Schema } from 'mongoose'
import { IUser } from './User'

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId | IUser
  type: 'battle_invite' | 'doubt_answered' | 'rank_up' | 'streak_milestone' | 'exam_reminder' | 'aria_alert' | 'boss_available'
  title?: string
  message?: string
  isRead: boolean
  data?: any
  expiresAt?: Date
  createdAt: Date
  updatedAt: Date
}

const notificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { 
    type: String, 
    enum: ['battle_invite', 'doubt_answered', 'rank_up', 'streak_milestone', 'exam_reminder', 'aria_alert', 'boss_available'],
    required: true
  },
  title: String,
  message: String,
  isRead: { type: Boolean, default: false },
  data: Schema.Types.Mixed,
  expiresAt: Date
}, { timestamps: true })

const Notification: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>('Notification', notificationSchema)
export default Notification
