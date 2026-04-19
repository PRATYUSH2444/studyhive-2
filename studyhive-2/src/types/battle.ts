export interface Question {
  id: string
  text: string
  options: string[]
  correctIndex: number
  explanation: string
  subject: string
  concept: string
  difficulty: 1 | 2 | 3 | 4 | 5
  timeLimit: number
  examFrequency: number
}

export interface BattlePlayer {
  userId: string
  name: string
  avatar: string
  eloRating: number
  score: number
  answeredCount: number
  correctCount: number
  currentStreak: number
}

export type BattleMode = 
  | 'oneVsOne' 
  | 'hiveWar' 
  | 'gauntlet' 
  | 'blitz' 
  | 'boss'

export type BattleStatus = 
  | 'waiting' 
  | 'active' 
  | 'completed'

export interface Battle {
  id: string
  mode: BattleMode
  status: BattleStatus
  players: BattlePlayer[]
  questions: Question[]
  currentQuestionIndex: number
  startedAt: Date
  topic: string
  subject: string
}
