import morgan from 'morgan'

export const logger = morgan('dev')

// Optionally could add a custom JSON logger here for production
// using winston or pino if desired.
