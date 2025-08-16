import workoutData from './workoutData.json';
import { Workout } from './types';

const WORKOUTS_STORAGE_KEY = 'fittrack_workouts';

export const initializeWorkouts = () => {
  const data = localStorage.getItem(WORKOUTS_STORAGE_KEY);
  if (!data || JSON.parse(data).length === 0) {
    localStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(workoutData.workouts));
  }
};

export const getWorkouts = (): Workout[] => {
  const data = localStorage.getItem(WORKOUTS_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getWorkoutById = (id: number): Workout | undefined => {
  const workouts = getWorkouts();
  return workouts.find(workout => workout.id === id);
};

export const addWorkout = (workout: Omit<Workout, 'id'>) => {
  const workouts = getWorkouts();
  const newWorkout: Workout = {
    ...workout,
    id: Date.now(), // Simple way to generate a unique ID
  };
  workouts.push(newWorkout);
  localStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(workouts));
  return newWorkout;
};

export const getExerciseLibrary = () => {
  return workoutData.exerciseLibrary;
};

export const getExerciseByName = (name: string) => {
    return workoutData.exerciseLibrary.find(exercise => exercise.name === name);
}

export const getWorkoutTypes = (): string[] => {
  const types = workoutData.workouts.map(w => w.type);
  return [...new Set(types)];
};

export const getDifficulties = (): string[] => {
  return ["Beginner", "Intermediate", "Advanced"];
};
