// import { Request, Response } from 'express';
// import asyncHandler from 'express-async-handler';
// import Goal from '../models/goalModel';

// // @desc    Create a new goal
// // @route   POST /api/goals
// // @access  Private
// const createGoal = asyncHandler(async (req: Request, res: Response) => {
//   const { goalType, target, currentValue, deadline } = req.body;

//   const goal = new Goal({
//     user: (req as any).user._id,
//     goalType,
//     target,
//     currentValue,
//     deadline,
//   });

//   const createdGoal = await goal.save();
//   res.status(201).json(createdGoal);
// });

// // @desc    Get all goals for a user
// // @route   GET /api/goals
// // @access  Private
// const getGoals = asyncHandler(async (req: Request, res: Response) => {
//   const goals = await Goal.find({ user: (req as any).user._id });
//   res.json(goals);
// });

// // @desc    Get a single goal by ID
// // @route   GET /api/goals/:id
// // @access  Private
// const getGoalById = asyncHandler(async (req: Request, res: Response) => {
//   const goal = await Goal.findById(req.params.id);

//   if (goal && goal.user.toString() === (req as any).user._id.toString()) {
//     res.json(goal);
//   } else {
//     res.status(404);
//     throw new Error('Goal not found');
//   }
// });

// // @desc    Update a goal
// // @route   PUT /api/goals/:id
// // @access  Private
// const updateGoal = asyncHandler(async (req: Request, res: Response) => {
//   const { currentValue } = req.body;

//   const goal = await Goal.findById(req.params.id);

//   if (goal && goal.user.toString() === (req as any).user._id.toString()) {
//     goal.currentValue = currentValue;

//     if (goal.currentValue >= goal.target) {
//       goal.isAchieved = true;
//     }

//     const updatedGoal = await goal.save();
//     res.json(updatedGoal);
//   } else {
//     res.status(404);
//     throw new Error('Goal not found');
//   }
// });

// // @desc    Delete a goal
// // @route   DELETE /api/goals/:id
// // @access  Private
// const deleteGoal = asyncHandler(async (req: Request, res: Response) => {
//   const goal = await Goal.findById(req.params.id);

//   if (goal && goal.user.toString() === (req as any).user._id.toString()) {
//    
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as goalService from '../services/goalService';
import { checkAndAwardGoalAchievements } from '../services/achievementService';

// @desc    Create a new goal
// @route   POST /api/goals
// @access  Private
const createGoal = asyncHandler(async (req: Request, res: Response) => {
  const { goalType, target, currentValue, deadline } = req.body;
  const userId = (req as any).user._id;

  const createdGoal = await goalService.createGoal(userId, goalType, target, currentValue, deadline);

  res.status(201).json(createdGoal);
});

// @desc    Get all goals for a user
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const goals = await goalService.getGoals(userId);
  res.json(goals);
});

// @desc    Get a single goal by ID
// @route   GET /api/goals/:id
// @access  Private
const getGoalById = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const goalId = req.params.id;
  const goal = await goalService.getGoalById(userId, goalId);

  if (goal) {
    res.json(goal);
  } else {
    res.status(404);
    throw new Error('Goal not found');
  }
});

// @desc    Update a goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req: Request, res: Response) => {
  const { currentValue } = req.body;
  const userId = (req as any).user._id;
  const goalId = req.params.id;

  const updatedGoal = await goalService.updateGoal(userId, goalId, currentValue);

  if (updatedGoal) {
    if (updatedGoal.isAchieved) {
      await checkAndAwardGoalAchievements(userId);
    }
    res.json(updatedGoal);
  } else {
    res.status(404);
    throw new Error('Goal not found');
  }
});

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const goalId = req.params.id;

  const success = await goalService.deleteGoal(userId, goalId);

  if (success) {
    res.json({ message: 'Goal removed' });
  } else {
    res.status(404);
    throw new Error('Goal not found');
  }
});

export { createGoal, getGoals, getGoalById, updateGoal, deleteGoal };
