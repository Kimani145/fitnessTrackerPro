import express from 'express';
const router = express.Router();
import {
  getDashboardData,
} from '../controllers/dashboardController';
import { protect } from '../middleware/authMiddleware';

router.route('/').get(protect, getDashboardData);

export default router;
