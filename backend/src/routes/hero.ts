import { Router } from 'express';
import {
  getAllHeroImages,
  replaceHeroImage,
  reorderHeroImages,
} from '../controllers/heroController';
import { authenticateToken } from '../middleware/auth';
import { uploadSingle } from '../middleware/upload';

const router = Router();

// Public routes
router.get('/', getAllHeroImages);

// Protected routes (admin only)
router.put('/replace/:orderIndex', authenticateToken, uploadSingle, replaceHeroImage);
router.put('/reorder', authenticateToken, reorderHeroImages);

export default router;