import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as workoutService from '../services/workoutService';
import { checkAndAwardWorkoutAchievements } from '../services/achievementService';

// @desc    Create a new workout
// @route   POST /api/workouts
// @access  Private
const createWorkout = asyncHandler(async (req: Request, res: Response) => {
  const { name, exercises } = req.body;
  const userId = (req as any).user._id;

  const createdWorkout = await workoutService.createWorkout(userId, name, exercises);

  await checkAndAwardWorkoutAchievements(userId);

  res.status(201).json(createdWorkout);
});

// @desc    Get all workouts for a user
// @route   GET /api/workouts
// @access  Private
const getWorkouts = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const workouts = await workoutService.getWorkouts(userId);
  res.json(workouts);
});

// @desc    Get a single workout by ID
// @route   GET /api/workouts/:id
// @access  Private
const getWorkoutById = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const workoutId = req.params.id;
  const workout = await workoutService.getWorkoutById(userId, workoutId);

  if (workout) {
    res.json(workout);
  } else {
    res.status(404);
    throw new Error('Workout not found');
  }
});

// @desc    Update a workout
// @route   PUT /api/workouts/:id
// @access  Private
const updateWorkout = asyncHandler(async (req: Request, res: Response) => {
  const { name, exercises } = req.body;
  const userId = (req as any).user._id;
  const workoutId = req.params.id;

  const updatedWorkout = await workoutService.updateWorkout(userId, workoutId, name, exercises);

  if (updatedWorkout) {
    res.json(updatedWorkout);
  } else {
    res.status(404);
    throw new Error('Workout not found');
  }
});

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const workoutId = req.params.id;

  const success = await workoutService.deleteWorkout(userId, workoutId);

  if (success) {
    res.json({ message: 'Workout removed' });
  } else {
    res.status(404);
    throw new Error('Workout not found');
  }
});

export { createWorkout, getWorkouts, getWorkoutById, updateWorkout, deleteWorkout };
