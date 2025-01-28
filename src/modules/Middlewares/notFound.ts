import { NextFunction, Request, Response } from 'express'

class NotFoundError extends Error {
  statusCode: number
  constructor (message: string) {
    super(message)
    this.statusCode = 404
  }
}

export const notFound = (_req: Request, _res: Response, next: NextFunction): void => {
  const error = new NotFoundError('Url not found')
  next(error)
}
