import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import prisma from '../config/database';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        name?: string;
      };
    }
  }
}

export interface JWTPayload extends jwt.JwtPayload {
  userId: number;
  email: string;
}

// Authentication middleware
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ error: 'Access token required' });
      return;
    }

    // Verify JWT token
    const decoded = jwt.verify(token, config.jwt.secret) as JWTPayload;

    // Get user from database
    const user = await prisma.adminUser.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true }
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid token - user not found' });
      return;
    }

    // Add user to request object
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name || undefined,
    };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' });
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expired' });
    } else {
      console.error('Auth middleware error:', error);
      res.status(500).json({ error: 'Authentication error' });
    }
  }
};

// Generate JWT token
export const generateToken = (userId: number, email: string): string => {
  const payload = { userId, email };
  return jwt.sign(payload, config.jwt.secret, { 
    expiresIn: config.jwt.expiresIn 
  } as jwt.SignOptions);
};

// Verify password helper
export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(plainPassword, hashedPassword);
};

// Hash password helper
export const hashPassword = async (password: string): Promise<string> => {
  const bcrypt = await import('bcryptjs');
  return bcrypt.hash(password, 12);
};