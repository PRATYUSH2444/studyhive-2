import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

export function useDailyBrief() {
  return useQuery({
    queryKey: ['aria', 'daily-brief'],
    queryFn: async () => {
      const { data } = await api.get('/api/aria/daily-brief')
      return data
    },
    staleTime: 3600000,
    retry: 1,
  })
}

export function useKnowledgeGraph() {
  return useQuery({
    queryKey: ['aria', 'knowledge-graph'],
    queryFn: async () => {
      const { data } = await api.get('/api/aria/knowledge-graph')
      return data
    },
    staleTime: 60000,
  })
}

export function useErrorDNA() {
  return useQuery({
    queryKey: ['aria', 'error-dna'],
    queryFn: async () => {
      const { data } = await api.get('/api/aria/error-dna')
      return data
    },
    staleTime: 60000,
  })
}

export function useScorePrediction() {
  return useQuery({
    queryKey: ['aria', 'score-prediction'],
    queryFn: async () => {
      const { data } = await api.get('/api/aria/score-prediction')
      return data
    },
    staleTime: 60000,
  })
}

export function useCrashPlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { 
      targetPercentile: number
      availableHoursPerDay: number 
    }) => api.post('/api/aria/crash-plan', data).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduler'] })
    },
  })
}
