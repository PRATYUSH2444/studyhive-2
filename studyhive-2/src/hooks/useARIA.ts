import { useARIAStore } from '@/store/useARIAStore'
import { useUserStore } from '@/store/useUserStore'

export function useARIA() {
  const store = useARIAStore()
  const { user } = useUserStore()
  
  const sendMessage = async (message: string) => {
    if (!user) return
    await store.sendMessage(message, store.activeMode)
  }
  
  const initializeARIA = async () => {
    await Promise.all([
      store.fetchDailyBrief(),
      store.fetchKnowledgeGraph(),
      store.fetchErrorDNA(),
      store.fetchScorePrediction(),
    ])
  }
  
  return {
    ...store,
    sendMessage,
    initializeARIA,
    daysToExam: user ? 
      Math.ceil((new Date(user.examDate || '').getTime() - 
      Date.now()) / 86400000) : 0,
    isReady: !!user,
  }
}
