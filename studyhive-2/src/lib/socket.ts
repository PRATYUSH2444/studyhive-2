import { io } from 'socket.io-client'

let socket: ReturnType<typeof io> | null = null

export const getSocket = () => socket

export const initSocket = (token: string) => {
  if (socket?.connected) return socket
  
  socket = io(
    import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001',
    {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
    }
  )
  
  return socket
}

export const disconnectSocket = () => {
  socket?.disconnect()
  socket = null
}

export default { getSocket, initSocket, disconnectSocket }
