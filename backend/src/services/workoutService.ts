import Workout, { IWorkout } from '../models/workoutModel';
import { Document } from 'mongoose';

const createWorkout = async (userId: string, name: string, exercises: any) => {
  const workout = new Workout({
    user: userId,
    name,
    exercises,
  });
  return await workout.save();
};

const getWorkouts = async (userId: string) => {
  return await Workout.find({ user: userId });
};

const getWorkoutById = async (userId: string, workoutId: string) => {
  return await Workout.findOne({ _id: workoutId, user: userId });
};
const updateWorkout = async (userId: string, workoutId: string, name: string, exercises: any) => {
  const workout = await Workout.findOne({ _id: workoutId, user: userId }) as (Document & IWorkout | null);

  if (workout) {
    workout.name = name;
    workout.exercises = exercises;
    return await workout.save();
  }

  return null;
};


const deleteWorkout = async (userId: string, workoutId: string) => {
  const workout = await Workout.findOne({ _id: workoutId, user: userId });

  if (workout) {
    await workout.deleteOne();
    return true;
  }

  return false;
};

export { createWorkout, getWorkouts, getWorkoutById, updateWorkout, deleteWorkout };
