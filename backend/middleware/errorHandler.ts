import type { Request, Response, NextFunction, RequestHandler } from 'express'
import chalk from 'chalk'

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

// Type-safe wrapper for async route handlers
export const asyncHandler = <
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
>(fn: (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction
) => Promise<any>): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(chalk.red('Error:'), err)

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message
    })
  }

  // Handle database errors
  if (err.message.includes('SQLITE_CONSTRAINT')) {
    return res.status(400).json({
      error: 'Database constraint violation'
    })
  }

  res.status(500).json({
    error: 'Internal server error'
  })
} 