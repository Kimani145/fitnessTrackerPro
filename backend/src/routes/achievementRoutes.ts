import express from 'express';
const router = express.Router();
import {
  getAchievements,
} from '../controllers/achievementController';
import { protect } from '../middleware/authMiddleware';

router.route('/').get(protect, getAchievements);

export default router;
