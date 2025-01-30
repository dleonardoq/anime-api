import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { dbConection } from '../anime/Connection'

export const dbConectionMiddleware = async (_req: Request, _res: Response, next: NextFunction): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    return next()
  }

  try {
    await dbConection()
  } catch (error) {
    next(error)
  }
}
