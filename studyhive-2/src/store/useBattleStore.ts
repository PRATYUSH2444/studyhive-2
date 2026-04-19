import { create } from 'zustand'
import { battleAPI } from '@/lib/api'

export type BattleMode = '1v1' | 'royal' | null
export interface Battle { id: string; status: string; [key: string]: any }
export interface LeaderboardEntry { name: string; score: number; rank: number }

interface BattleState {
  currentBattle: Battle | null
  battleMode: BattleMode
  isMatchmaking: boolean
  matchmakingTime: number
  selectedAnswer: string | null
  timeLeft: number
  isConnected: boolean
  recentBattles: Battle[]
  leaderboard: LeaderboardEntry[]

  setBattle: (battle: Battle) => void
  setBattleMode: (mode: BattleMode) => void
  setMatchmaking: (isMatchmaking: boolean) => void
  setSelectedAnswer: (answer: string | null) => void
  setTimeLeft: (time: number) => void
  clearBattle: () => void

  startMatchmaking: (subject: string, topic: string, examTarget: string) => Promise<void>
  fetchRecentBattles: () => Promise<void>
  fetchLeaderboard: (examTarget: string) => Promise<void>
}

export const useBattleStore = create<BattleState>((set) => ({
  currentBattle: null,
  battleMode: null,
  isMatchmaking: false,
  matchmakingTime: 0,
  selectedAnswer: null,
  timeLeft: 90,
  isConnected: false,
  recentBattles: [],
  leaderboard: [],

  setBattle: (battle) => set({ currentBattle: battle }),
  setBattleMode: (mode) => set({ battleMode: mode }),
  setMatchmaking: (isMatchmaking) => set({ isMatchmaking }),
  setSelectedAnswer: (selectedAnswer) => set({ selectedAnswer }),
  setTimeLeft: (timeLeft) => set({ timeLeft }),
  clearBattle: () => set({ currentBattle: null, selectedAnswer: null }),

  startMatchmaking: async (subject, topic, examTarget) => {
    set({ isMatchmaking: true })
    try {
      const { data } = await battleAPI.matchmake({ subject, topic, examTarget })
      set({ currentBattle: data.battle, isMatchmaking: false })
    } catch (err) {
      console.error(err)
      set({ isMatchmaking: false })
    }
  },

  fetchRecentBattles: async () => {
    try {
      const { data } = await battleAPI.history()
      set({ recentBattles: data })
    } catch (err) { console.error(err) }
  },

  fetchLeaderboard: async (examTarget) => {
    try {
      const { data } = await battleAPI.leaderboard({ examTarget })
      set({ leaderboard: data })
    } catch (err) { console.error(err) }
  }
}))
