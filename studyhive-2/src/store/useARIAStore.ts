import { create } from 'zustand'
import { ariaAPI } from '@/lib/api'

export type ARIAMode = 'strict' | 'supportive' | 'socratic' | 'strategist'

export interface ARIAProfile {
  name: string
  examTarget: string
  daysToExam: number
  accuracy: number
  projectedPercentile: number
  streak: number
  peakWindow: { start: string, end: string }
  weakTopics: any[]
  recentErrors: any[]
}

export interface ARIAMessage {
  id: string
  role: 'user' | 'aria'
  content: string
  timestamp: Date
  mode: ARIAMode
}

interface ARIAState {
  ariaProfile: ARIAProfile | null
  messages: ARIAMessage[]
  isTyping: boolean
  activeMode: ARIAMode
  suggestedFollowUps: string[]
  dailyBrief: any | null
  knowledgeGraph: any[]
  errorDNA: any[]
  scorePrediction: any | null

  setActiveMode: (mode: ARIAMode) => void
  addMessage: (message: ARIAMessage) => void
  setTyping: (typing: boolean) => void
  setSuggestedFollowUps: (followUps: string[]) => void
  clearMessages: () => void

  sendMessage: (message: string, mode: ARIAMode) => Promise<void>
  fetchDailyBrief: () => Promise<void>
  fetchKnowledgeGraph: () => Promise<void>
  fetchErrorDNA: () => Promise<void>
  fetchScorePrediction: () => Promise<void>
}

export const useARIAStore = create<ARIAState>((set, get) => ({
  ariaProfile: null,
  messages: [],
  isTyping: false,
  activeMode: 'socratic',
  suggestedFollowUps: [],
  dailyBrief: null,
  knowledgeGraph: [],
  errorDNA: [],
  scorePrediction: null,

  setActiveMode: (mode) => set({ activeMode: mode }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setTyping: (isTyping) => set({ isTyping }),
  setSuggestedFollowUps: (suggestedFollowUps) => set({ suggestedFollowUps }),
  clearMessages: () => set({ messages: [] }),

  sendMessage: async (message, mode) => {
    const userMsg: ARIAMessage = { id: Date.now().toString(), role: 'user', content: message, timestamp: new Date(), mode }
    get().addMessage(userMsg)
    set({ isTyping: true })
    
    try {
      const { data } = await ariaAPI.chat(message, mode)
      const ariaMsg: ARIAMessage = { id: (Date.now() + 1).toString(), role: 'aria', content: data.response || data.error || 'Empty Response', timestamp: new Date(), mode }
      get().addMessage(ariaMsg)
      set({ suggestedFollowUps: data.suggestedFollowUps || [] })
    } catch (err: any) {
      console.error(err)
      get().addMessage({ id: Date.now().toString(), role: 'aria', content: 'Connection failed.', timestamp: new Date(), mode })
    } finally {
      set({ isTyping: false })
    }
  },

  fetchDailyBrief: async () => {
    try {
      const { data } = await ariaAPI.dailyBrief()
      set({ dailyBrief: data })
    } catch (err) { console.error('fetchDailyBrief err', err) }
  },

  fetchKnowledgeGraph: async () => {
    try {
      const { data } = await ariaAPI.knowledgeGraph()
      set({ knowledgeGraph: data })
    } catch (err) { console.error('fetchKnowledgeGraph err', err) }
  },

  fetchErrorDNA: async () => {
    try {
      const { data } = await ariaAPI.errorDNA()
      set({ errorDNA: data })
    } catch (err) { console.error('fetchErrorDNA err', err) }
  },

  fetchScorePrediction: async () => {
    try {
      const { data } = await ariaAPI.scorePrediction()
      set({ scorePrediction: data })
    } catch (err) { console.error('fetchScorePrediction err', err) }
  }
}))
