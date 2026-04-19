import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IQuestion extends Document {
  text: string
  options: string[]
  correctIndex: number
  explanation: string
  subject: string
  concept: string
  difficulty: number
  examTarget: string[]
  questionType: 'numerical' | 'conceptual' | 'assertion-reason' | 'case-based' | 'diagram-based'
  timeLimit: number
  examFrequency: number
  isAIGenerated: boolean
  isPYQ: boolean
  pyqYear?: number
  pyqExam?: string
  tags: string[]
  usageCount: number
  correctCount: number
  generatedBy?: string
  createdAt: Date
  updatedAt: Date
}

const questionSchema = new Schema<IQuestion>({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true, min: 0, max: 3 },
  explanation: { type: String, required: true },
  subject: { type: String, required: true },
  concept: { type: String, required: true },
  difficulty: { type: Number, required: true, min: 1, max: 5 },
  examTarget: [{ type: String }],
  questionType: { 
    type: String, 
    enum: ['numerical', 'conceptual', 'assertion-reason', 'case-based', 'diagram-based'] 
  },
  timeLimit: { type: Number, default: 90 },
  examFrequency: { type: Number, min: 0, max: 100 },
  isAIGenerated: { type: Boolean, default: true },
  isPYQ: { type: Boolean, default: false },
  pyqYear: Number,
  pyqExam: String,
  tags: [String],
  usageCount: { type: Number, default: 0 },
  correctCount: { type: Number, default: 0 },
  generatedBy: String
}, { timestamps: true })

const Question: Model<IQuestion> = mongoose.models.Question || mongoose.model<IQuestion>('Question', questionSchema)
export default Question
