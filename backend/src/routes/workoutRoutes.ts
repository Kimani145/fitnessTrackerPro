import { Router } from 'express';
import {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} from '../controllers/workoutController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.route('/').post(protect, createWorkout).get(protect, getWorkouts);
router.route('/:id').get(protect, getWorkoutById).put(protect, updateWorkout).delete(protect, deleteWorkout);

export default router;

