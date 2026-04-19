import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

export function useAnalyticsOverview() {
  return useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: async () => {
      const { data } = await api.get('/api/analytics/overview')
      return data
    },
    staleTime: 30000,
  })
}

export function usePerformanceTrend(period: '7d' | '30d' | '90d' = '90d') {
  return useQuery({
    queryKey: ['analytics', 'trend', period],
    queryFn: async () => {
      const { data } = await api.get('/api/analytics/performance-trend', {
        params: { period }
      })
      return data
    },
    staleTime: 60000,
  })
}

export function useSubjectBreakdown() {
  return useQuery({
    queryKey: ['analytics', 'subjects'],
    queryFn: async () => {
      const { data } = await api.get('/api/analytics/subject-breakdown')
      return data
    },
    staleTime: 60000,
  })
}

export function useWeeklyReport() {
  return useQuery({
    queryKey: ['analytics', 'weekly-report'],
    queryFn: async () => {
      const { data } = await api.get('/api/analytics/weekly-report')
      return data
    },
    staleTime: 300000,
  })
}

export function useSessionStart() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { subject: string; topic: string; plannedMinutes: number }) =>
      api.post('/api/analytics/session/start', data).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

export function useSessionEnd() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: { 
      id: string
      actualMinutes: number
      questionsAttempted: number
      questionsCorrect: number 
    }) => api.patch(`/api/analytics/session/${id}/end`, data).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}
