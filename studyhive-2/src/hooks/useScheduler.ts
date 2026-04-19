import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

export function useTodaySchedule() {
  return useQuery({
    queryKey: ['scheduler', 'today'],
    queryFn: async () => {
      const { data } = await api.get('/api/scheduler/today')
      return data
    },
    staleTime: 30000,
  })
}

export function useGenerateSchedule() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: {
      targetPercentile: number
      availableHours: number
      startDate: string
      endDate: string
    }) => api.post('/api/scheduler/generate', data).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduler'] })
    },
  })
}

export function useUpdateSession() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; status: string; notes?: string }) =>
      api.patch(`/api/scheduler/session/${id}`, data).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduler'] })
    },
  })
}

export function useDueFlashcards() {
  return useQuery({
    queryKey: ['scheduler', 'flashcards', 'due'],
    queryFn: async () => {
      const { data } = await api.get('/api/scheduler/flashcards/due')
      return data
    },
    staleTime: 60000,
  })
}

export function useReviewFlashcard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, rating }: { id: string; rating: number }) =>
      api.post('/api/scheduler/flashcards/review', { 
        flashcardId: id, rating 
      }).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduler', 'flashcards'] })
    },
  })
}
