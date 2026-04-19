import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import { connectDB } from './config/db'
import { errorHandler } from './middleware/errorHandler'
import { generalLimiter } from './middleware/rateLimit'
import { initSocketHandlers } from './socket'
import authRoutes from './routes/auth'
import ariaRoutes from './routes/aria'
import questionRoutes from './routes/questions'
import battleRoutes from './routes/battles'
import analyticsRoutes from './routes/analytics'
import userRoutes from './routes/users'
import roomRoutes from './routes/rooms'
import schedulerRoutes from './routes/scheduler'
import notificationRoutes from './routes/notifications'
import './jobs/forgettingCurve.job'
import './jobs/scoreProjection.job'
import './jobs/dailyBlitz.job'
import './jobs/weeklyReport.job'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL, credentials: true }
})

app.set('trust proxy', 1)

app.use(helmet())
app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      'http://localhost:5173',
      'http://localhost:5174', 
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:5177',
      'http://localhost:5178',
      'http://localhost:5179',
      process.env.FRONTEND_URL,
    ]
    if (!origin || allowed.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(compression())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use(morgan('dev'))
// app.use(generalLimiter)

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  })
})

app.use('/auth', authRoutes)
app.use('/api/aria', ariaRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/battles', battleRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/users', userRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/scheduler', schedulerRoutes)
app.use('/api/notifications', notificationRoutes)

initSocketHandlers(io)

app.use(errorHandler)

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

const start = async () => {
  await connectDB()
  const PORT = process.env.PORT || 3001
  httpServer.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════╗
    ║   StudyHive 2.0 Backend Live     ║
    ║   Port: ${PORT}                     ║
    ║   Environment: ${process.env.NODE_ENV}       ║
    ╚══════════════════════════════════╝
    `)
  })
}

start().catch(console.error)
// force dot env reload 3
