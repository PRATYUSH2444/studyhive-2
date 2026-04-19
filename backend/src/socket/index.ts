import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { initBattleSocket } from './battle.socket'
import { initRoomSocket } from './room.socket'

export const initSocketHandlers = (io: Server) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token
      if (!token) return next(new Error('Authentication error'))

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
      const user = await User.findById(decoded.userId)
      if (!user) return next(new Error('User not found'))

      socket.data.user = user
      next()
    } catch (err) {
      next(new Error('Authentication error'))
    }
  })

  io.on('connection', (socket) => {
    const user = socket.data.user
    
    // Personal Room
    socket.join(`user:${user._id}`)
    socket.emit('connected', { userId: user._id, name: user.name })
    
    // Redis could mark user online here

    initBattleSocket(io, socket)
    initRoomSocket(io, socket)

    socket.on('disconnect', () => {
      // Redis mark user offline
    })
  })
}
