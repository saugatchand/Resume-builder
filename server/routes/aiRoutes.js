import express from 'express';
import { generateSummary, improveBulletPoints } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate-summary', protect, generateSummary);
router.post('/improve-bullet-points', protect, improveBulletPoints);

export default router;
