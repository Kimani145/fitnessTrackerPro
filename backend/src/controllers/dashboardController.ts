import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as workoutService from '../services/workoutService';
import * as goalService from '../services/goalService';
import * as achievementService from '../services/achievementService';

// @desc    Get dashboard data
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;

  const workouts = await workoutService.getWorkouts(userId);
  const activeGoals = await goalService.getGoals(userId);
  const achievements = await achievementService.getAchievements(userId);

  // Mock data for now
  const totalCaloriesBurned = 5000;

  res.json({
    totalWorkouts: workouts.length,
    totalCaloriesBurned,
    activeGoals: activeGoals.filter(goal => !goal.isAchieved),
    achievementsUnlocked: achievements.length,
  });
});

export { getDashboardData };
