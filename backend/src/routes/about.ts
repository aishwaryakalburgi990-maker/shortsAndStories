import { Router } from 'express';
import {
  getAboutMe,
  updateAboutMe,
  uploadProfileImage,
} from '../controllers/aboutController';
import { authenticateToken } from '../middleware/auth';
import { uploadSingle } from '../middleware/upload';

const router = Router();

// Public routes
router.get('/', getAboutMe);

// Protected routes (admin only)
router.put('/', authenticateToken, updateAboutMe);
router.post('/upload-profile', authenticateToken, uploadSingle, uploadProfileImage);

export default router;