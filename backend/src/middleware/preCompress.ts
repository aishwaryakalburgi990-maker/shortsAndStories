import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import { config } from '../config/env';

// Pre-compression middleware to handle large files
export const preCompressMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Skip if no files in the request
    if (!req.body || typeof req.body !== 'object') {
      return next();
    }

    // This middleware works with raw body data before multer processes it
    // We'll implement this differently - by increasing the multer limit temporarily
    // and then compressing in the controller
    next();
  } catch (error) {
    console.error('Pre-compression error:', error);
    next(error);
  }
};