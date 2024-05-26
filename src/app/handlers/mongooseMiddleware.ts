// handlers/mongooseMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';

const mongooseMiddleware = (
  err: Error.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Error.ValidationError) {
    const errors = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({ errors });
  }
  next(err);
};

export default mongooseMiddleware;
