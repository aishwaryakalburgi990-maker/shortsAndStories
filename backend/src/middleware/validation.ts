import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Validation middleware factory
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      res.status(400).json({
        error: 'Validation error',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message,
        })),
      });
      return;
    }
    
    next();
  };
};

// Auth validation schemas
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required',
  }),
});

// Couple validation schemas
export const createCoupleSchema = Joi.object({
  names: Joi.string().required().messages({
    'any.required': 'Couple names are required',
  }),
  title: Joi.string().required().messages({
    'any.required': 'Title is required',
  }),
  description: Joi.string().allow('').optional(),
  location: Joi.string().allow('').optional(),
  date: Joi.string().allow('').optional(),
  videoUrl: Joi.string().uri().allow('').optional().messages({
    'string.uri': 'Video URL must be a valid URL',
  }),
});

export const updateCoupleSchema = Joi.object({
  names: Joi.string().optional(),
  title: Joi.string().optional(),
  description: Joi.string().allow('').optional(),
  location: Joi.string().allow('').optional(),
  date: Joi.string().allow('').optional(),
  videoUrl: Joi.string().uri().allow('').optional().messages({
    'string.uri': 'Video URL must be a valid URL',
  }),
});

// Hero image validation schemas
export const createHeroImageSchema = Joi.object({
  title: Joi.string().allow('').optional(),
  subtitle: Joi.string().allow('').optional(),
  orderIndex: Joi.number().integer().min(0).optional(),
});

export const updateHeroImageSchema = Joi.object({
  title: Joi.string().allow('').optional(),
  subtitle: Joi.string().allow('').optional(),
  orderIndex: Joi.number().integer().min(0).optional(),
  isActive: Joi.boolean().optional(),
});

// About validation schema
export const updateAboutSchema = Joi.object({
  authorName: Joi.string().optional(),
  description: Joi.string().allow('').optional(),
  yearsExperience: Joi.number().integer().min(0).optional(),
  couplesServed: Joi.number().integer().min(0).optional(),
  awardsCount: Joi.number().integer().min(0).optional(),
  location: Joi.string().allow('').optional(),
});

// Image reorder validation schema
export const reorderImagesSchema = Joi.object({
  imageIds: Joi.array().items(Joi.number().integer().positive()).required().messages({
    'any.required': 'Image IDs array is required',
    'array.base': 'Image IDs must be an array',
  }),
});