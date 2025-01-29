import { NextFunction, Request, Response } from 'express'

interface ErrorResponse extends Error {
  statusCode: number
}

export const errorHandler = (err: ErrorResponse, _req: Request, res: Response, _next: NextFunction): void => {
  const statusCode = !isNaN(err.statusCode) ? err.statusCode : 500
  res.status(statusCode).json({
    statusCode,
    message: err.message
  })
}
