import { Router } from 'express';
import {
  getAllCouples,
  getCouplesWithVideos,
  getCoupleById,
  createCouple,
  updateCouple,
  deleteCouple,
} from '../controllers/couplesController';
import {
  uploadCoupleImages,
  uploadCoverImage,
  deleteCoupleImage,
  reorderCoupleImages,
} from '../controllers/imagesController';
import { authenticateToken } from '../middleware/auth';
import { uploadMultiple, uploadSingle } from '../middleware/upload';

const router = Router();

// Public routes
router.get('/', getAllCouples);
router.get('/videos', getCouplesWithVideos);
router.get('/:id', getCoupleById);

// Protected routes (admin only)
router.post('/', authenticateToken, createCouple);
router.put('/:id', authenticateToken, updateCouple);
router.delete('/:id', authenticateToken, deleteCouple);

// Couple image management routes
router.post('/:coupleId/images', authenticateToken, uploadMultiple, uploadCoupleImages);
router.post('/:coupleId/cover', authenticateToken, uploadSingle, uploadCoverImage);
router.delete('/images/:imageId', authenticateToken, deleteCoupleImage);
router.put('/:coupleId/images/reorder', authenticateToken, reorderCoupleImages);

export default router;