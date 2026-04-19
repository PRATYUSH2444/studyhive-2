import { useEffect } from 'react'
import { useBattleStore } from '@/store/useBattleStore'
import { useSocket } from '@/hooks/useSocket'
import { useUserStore } from '@/store/useUserStore'

export function useBattle() {
  const store = useBattleStore()
  const { emit, on, off } = useSocket()
  const { user } = useUserStore()
  
  const joinBattle = (battleId: string) => {
    emit('battle:join', { battleId })
  }
  
  const submitAnswer = (
    battleId: string, 
    questionId: string, 
    selectedIndex: number,
    timeSpent: number
  ) => {
    emit('battle:answer', { 
      battleId, questionId, selectedIndex, timeSpent 
    })
    store.setSelectedAnswer(selectedIndex.toString())
  }
  
  const surrender = (battleId: string) => {
    emit('battle:surrender', { battleId })
    store.clearBattle()
  }
  
  useEffect(() => {
    on('battle:start', (data) => {
      store.setBattle(data.battle)
    })
    on('battle:next_question', (data) => {
      store.setSelectedAnswer(null)
      store.setTimeLeft(data.timeLimit || 90)
    })
    on('battle:complete', (data) => {
      store.clearBattle()
    })
    return () => {
      off('battle:start')
      off('battle:next_question')
      off('battle:complete')
    }
  }, [])
  
  return {
    ...store,
    joinBattle,
    submitAnswer,
    surrender,
    currentUser: user,
  }
}
