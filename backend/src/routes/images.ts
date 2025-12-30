import { Router } from 'express';
import {
  uploadImages,
  deleteImage,
  reorderImages,
} from '../controllers/imagesController';
import { authenticateToken } from '../middleware/auth';
import { uploadMiddleware } from '../middleware/upload';

const router = Router();

// All image routes are protected (admin only)
router.post('/upload', authenticateToken, uploadMiddleware, uploadImages);
router.delete('/:id', authenticateToken, deleteImage);
router.put('/reorder', authenticateToken, reorderImages);

export default router;