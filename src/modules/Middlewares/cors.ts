import { logger } from '@common/Logger'
import cors from 'cors'

const ALLOWED_ORIGINS = [
  'http://localhost:40054'
]

export const corsMiddleware = ({ allowedOrigins = ALLOWED_ORIGINS } = {}): ReturnType<typeof cors> => cors({
  origin: (origin, callback) => {
    if (origin == null) {
      return callback(null, true)
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    logger.error({ message: `Origin not allowed by CORS: ${origin as string}` })
    return callback(new Error('Not allowed by CORS'))
  }
})
