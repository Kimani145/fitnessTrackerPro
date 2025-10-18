import express from 'express';
const router = express.Router();
import {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
} from '../controllers/goalController';
import { protect } from '../middleware/authMiddleware';

router.route('/').post(protect, createGoal).get(protect, getGoals);
router.route('/:id').get(protect, getGoalById).put(protect, updateGoal).delete(protect, deleteGoal);

export default router;
