export type ExamTarget = 'JEE' | 'NEET' | 'UPSC' | 'CAT' | 'GATE' | 'CLAT'

export type HiveRank = 
  | 'Apprentice' 
  | 'Scholar' 
  | 'Thinker' 
  | 'Innovator' 
  | 'Architect' 
  | 'Genius' 
  | 'Einstein'

export type MasteryLevel = 'mastered' | 'shaky' | 'danger' | 'untouched'

export type ARIAMode = 'strict' | 'supportive' | 'socratic' | 'strategist'

export type UserStatus = 'online' | 'offline' | 'in_battle' | 'in_room' | 'focus_mode'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  examTarget?: string
  examDate?: string
  rank?: string
  eloRating?: number
  streak?: number
  daysToExam?: number
  projectedPercentile?: number
  peakWindow?: string
  weakTopics?: WeakTopic[]
  crystals?: Crystal[]
  createdAt?: Date
  xp?: number
  level?: number
  isOnline?: boolean
  status?: UserStatus
}

export interface WeakTopic {
  id: string
  subject: string
  concept: string
  masteryPercent: number
  lastPracticed: Date
  mastery: MasteryLevel
  ariaRecommendation: string
}

export interface Crystal {
  id: string
  subject: string
  concept: string
  earnedAt: Date
  mastery: MasteryLevel
}

export interface KnowledgeNode {
  id: string
  concept: string
  subject: string
  mastery: MasteryLevel
  masteryPercent: number
  lastPracticed: Date
  connections: string[]
  x?: number
  y?: number
  z?: number
}

export interface FeedItem {
  id: string
  type: 'battle' | 'doubt' | 'milestone' | 'alert'
  user: string
  action: string
  subject?: string
  time: string
  points?: number
}

export interface Task {
  id: string
  priority: 'high' | 'med' | 'low'
  subject: string
  task: string
  color: string
  completed: boolean
}
