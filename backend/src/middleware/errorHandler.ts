import { Request, Response, NextFunction } from 'express'

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString()
  
  if (process.env.NODE_ENV !== 'test') {
    console.error(`[${timestamp}] Error Handler:`, err)
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message, code: 'MONGOOSE_VALIDATION_ERROR' })
  }

  // MongoDB Duplicate Key Error
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Resource already exists', code: 'DUPLICATE_KEY_ERROR' })
  }

  // JWT Errors
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Invalid token', code: 'UNAUTHORIZED_ERROR' })
  }

  // Default
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({
    error: message,
    code: err.code || 'INTERNAL_SERVER_ERROR'
  })
}
