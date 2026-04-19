import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useUserStore } from '@/store/useUserStore'

export function useSocket() {
  const socketRef = useRef<Socket | null>(null)
  const { accessToken } = useUserStore()
  
  useEffect(() => {
    if (!accessToken) return
    
    socketRef.current = io(
      import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001',
      {
        auth: { token: accessToken },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      }
    )
    
    const socket = socketRef.current
    
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
    })
    
    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
    })
    
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
    })
    
    return () => {
      socket.disconnect()
    }
  }, [accessToken])
  
  const emit = (event: string, data?: any) => {
    socketRef.current?.emit(event, data)
  }
  
  const on = (event: string, handler: (...args: any[]) => void) => {
    socketRef.current?.on(event, handler)
  }
  
  const off = (event: string, handler?: (...args: any[]) => void) => {
    socketRef.current?.off(event, handler)
  }
  
  return {
    socket: socketRef.current,
    emit,
    on,
    off,
    isConnected: socketRef.current?.connected ?? false,
  }
}
