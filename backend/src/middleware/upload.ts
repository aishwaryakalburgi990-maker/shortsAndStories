import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import { config } from '../config/env';

// File filter for images
const fileFilter = (req: Request, file: any, cb: FileFilterCallback) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Multer configuration for memory storage with larger temporary limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB temporary limit to allow large files for compression
    files: config.upload.maxFilesPerUpload, // Max 10 files
  },
  fileFilter,
});

// Middleware for single file upload
export const uploadSingle = upload.single('image');

// Middleware for multiple file upload
export const uploadMultiple = upload.array('images', config.upload.maxFilesPerUpload);

// Default middleware for images route (multiple files)
export const uploadMiddleware = uploadMultiple;

// Error handler for multer errors
export const handleUploadError = (error: any, req: Request, res: any, next: any) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        message: `Maximum file size is 50MB. Files larger than 10MB will be automatically compressed.`
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        error: 'Too many files',
        message: `Maximum ${config.upload.maxFilesPerUpload} files allowed`
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        error: 'Unexpected field',
        message: 'Invalid file field name'
      });
    }
  }
  
  if (error.message === 'Only image files are allowed!') {
    return res.status(400).json({
      error: 'Invalid file type',
      message: 'Only image files (JPG, PNG, WebP) are allowed'
    });
  }

  next(error);
};