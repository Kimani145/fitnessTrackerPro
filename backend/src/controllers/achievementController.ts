import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as achievementService from '../services/achievementService';

// @desc    Get all achievements for a user
// @route   GET /api/achievements
// @access  Private
const getAchievements = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const achievements = await achievementService.getAchievements(userId);
  res.json(achievements);
});

export { getAchievements };
