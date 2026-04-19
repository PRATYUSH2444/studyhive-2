import { Server, Socket } from 'socket.io'

export const initRoomSocket = (io: Server, socket: Socket) => {
  socket.on('room:join', ({ roomId }) => {
    socket.join(roomId)
    socket.to(roomId).emit('room:member_joined', { user: socket.data.user })
  })

  socket.on('room:leave', ({ roomId }) => {
    socket.leave(roomId)
    socket.to(roomId).emit('room:member_left', { userId: socket.data.user._id })
  })

  socket.on('room:message', ({ roomId, message }) => {
    io.to(roomId).emit('room:message', {
      userId: socket.data.user._id,
      name: socket.data.user.name,
      message,
      timestamp: new Date()
    })
  })

  socket.on('room:pomodoro_sync', ({ roomId, action }) => {
    socket.to(roomId).emit('room:pomodoro_sync', { action, triggeredBy: socket.data.user._id })
  })

  socket.on('room:whiteboard_update', ({ roomId, data }) => {
    socket.to(roomId).emit('room:whiteboard_update', data)
  })

  socket.on('room:battle_question', ({ roomId, questionId }) => {
    io.to(roomId).emit('room:battle_question', { questionId })
  })
}
