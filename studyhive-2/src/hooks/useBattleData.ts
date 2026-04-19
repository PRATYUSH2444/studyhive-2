import { useQuery, useMutation } from '@tanstack/react-query'
import api from '@/lib/api'

export function useBattleHistory() {
  return useQuery({
    queryKey: ['battles', 'history'],
    queryFn: async () => {
      const { data } = await api.get('/api/battles/history')
      return data
    },
    staleTime: 30000,
  })
}

export function useLeaderboard(examTarget?: string) {
  return useQuery({
    queryKey: ['battles', 'leaderboard', examTarget],
    queryFn: async () => {
      const { data } = await api.get('/api/battles/leaderboard', {
        params: { examTarget }
      })
      return data
    },
    staleTime: 60000,
  })
}

export function useDailyBlitz() {
  return useQuery({
    queryKey: ['battles', 'daily-blitz'],
    queryFn: async () => {
      const { data } = await api.get('/api/questions/daily-blitz')
      return data
    },
    staleTime: 3600000,
  })
}

export function useStartMatchmaking() {
  return useMutation({
    mutationFn: (data: { 
      subject: string
      topic: string
      examTarget: string 
    }) => api.post('/api/battles/matchmake', data).then(r => r.data),
  })
}
