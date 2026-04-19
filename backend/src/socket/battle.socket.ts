import { Server, Socket } from 'socket.io'
import Battle from '../models/Battle'
import Question from '../models/Question'
import Notification from '../models/Notification'
import { scoringService } from '../services/scoring.service'

export const initBattleSocket = (io: Server, socket: Socket) => {
  const endBattle = async (battle: any) => {
    battle.status = 'completed'
    battle.completedAt = new Date()
    
    const p1 = battle.players[0]
    const p2 = battle.players[1]
    
    let result1 = 0.5, result2 = 0.5
    if (p1.score > p2.score) { result1 = 1; result2 = 0; battle.winnerId = p1.userId }
    else if (p2.score > p1.score) { result1 = 0; result2 = 1; battle.winnerId = p2.userId }

    const elo1 = scoringService.calculateELO(p1.eloRating, p2.eloRating, result1)
    const elo2 = scoringService.calculateELO(p2.eloRating, p1.eloRating, result2)

    battle.eloChanges = [
      { userId: p1.userId, change: elo1.change, newRating: elo1.newRating },
      { userId: p2.userId, change: elo2.change, newRating: elo2.newRating }
    ]

    await battle.save()

    // Send notifications
    await Notification.create([
      { userId: p1.userId, type: 'battle_invite', title: 'Battle Finished!', message: result1 === 1 ? 'You won!' : 'You lost.' },
      { userId: p2.userId, type: 'battle_invite', title: 'Battle Finished!', message: result2 === 1 ? 'You won!' : 'You lost.' }
    ])

    io.to(battle.roomId).emit('battle:complete', { winnerId: battle.winnerId, eloChanges: battle.eloChanges, analysis: 'Great match!' })
  }

  socket.on('battle:join', async ({ battleId }) => {
    const battle = await Battle.findById(battleId).populate('questions')
    if (!battle) return

    socket.join(battle.roomId!)
    socket.to(battle.roomId!).emit('battle:player_joined', { user: socket.data.user })

    if (battle.players.length === 2 && battle.status === 'active') {
      io.to(battle.roomId!).emit('battle:countdown', 5)
      setTimeout(() => {
        io.to(battle.roomId!).emit('battle:start', { startQuestion: battle.questions[0] })
      }, 5000)
    }
  })

  socket.on('battle:answer', async ({ battleId, questionId, selectedIndex, timeSpent }) => {
    const battle = await Battle.findById(battleId).populate('questions')
    if (!battle) return

    const question = await Question.findById(questionId)
    const isCorrect = question?.correctIndex === selectedIndex

    const player = battle.players.find(p => p.userId.toString() === socket.data.user._id.toString())
    if (player) {
      player.answers.push({ questionId, selectedIndex, isCorrect, timeSpent } as any)
      if (isCorrect) player.score += 10
      player.currentQuestionIndex += 1
    }
    await battle.save()

    socket.emit('battle:answer_result', { isCorrect, correctIndex: question?.correctIndex })
    socket.to(battle.roomId!).emit('battle:opponent_answered', { answered: true, currentQuestionIndex: player?.currentQuestionIndex })

    // Check if both answered current
    const opponent = battle.players.find(p => p.userId.toString() !== socket.data.user._id.toString())
    if (player && opponent && player.currentQuestionIndex === opponent.currentQuestionIndex) {
      if (player.currentQuestionIndex < battle.questions.length) {
        io.to(battle.roomId!).emit('battle:next_question', { nextQuestion: battle.questions[player.currentQuestionIndex] })
      } else {
        await endBattle(battle)
      }
    }
  })

  socket.on('battle:surrender', async ({ battleId }) => {
    const battle = await Battle.findById(battleId)
    if (!battle) return
    socket.to(battle.roomId!).emit('battle:opponent_surrendered')
    
    const p1 = battle.players[0]
    const p2 = battle.players[1]
    
    if (p1.userId.toString() === socket.data.user._id.toString()) {
      p1.score = -999
    } else if (p2) {
      p2.score = -999
    }
    await battle.save()
    await endBattle(battle)
  })

  socket.on('battle:timer_expired', async ({ battleId, questionId }) => {
    // Treat as incorrect answer implicitly
    socket.emit('battle:answer_result', { isCorrect: false, correctIndex: -1 })
  })
}
