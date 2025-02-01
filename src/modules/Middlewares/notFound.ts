import { NextFunction, Request, Response } from 'express'
import { PersonalizedError } from '@common/PersonalizedError'

export const notFound = (_req: Request, _res: Response, next: NextFunction): void => {
  const error = new PersonalizedError('Url not found', 404)
  next(error)
}
