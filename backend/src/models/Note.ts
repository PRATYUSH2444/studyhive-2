import mongoose, { Document, Model, Schema } from 'mongoose'
import { IUser } from './User'

interface Flashcard {
  front: string
  back: string
  nextReview?: Date
  easeFactor: number
  interval: number
  reviewCount: number
}

export interface INote extends Document {
  userId: mongoose.Types.ObjectId | IUser
  title?: string
  content?: string
  subject?: string
  concepts: string[]
  flashcards: Flashcard[]
  isPublic: boolean
  collaborators: (mongoose.Types.ObjectId | IUser)[]
  aiSummary?: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const noteSchema = new Schema<INote>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  content: String,
  subject: String,
  concepts: [String],
  flashcards: [{
    front: String,
    back: String,
    nextReview: Date,
    easeFactor: { type: Number, default: 2.5 },
    interval: { type: Number, default: 1 },
    reviewCount: { type: Number, default: 0 }
  }],
  isPublic: { type: Boolean, default: false },
  collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  aiSummary: String,
  tags: [String]
}, { timestamps: true })

const Note: Model<INote> = mongoose.models.Note || mongoose.model<INote>('Note', noteSchema)
export default Note
