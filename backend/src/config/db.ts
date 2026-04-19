import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables')
    }

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected')
    })

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err)
      process.exit(1)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected')
    })

    await mongoose.connect(uri)
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
    process.exit(1)
  }
}
