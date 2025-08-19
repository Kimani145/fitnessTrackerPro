import { Event } from "react-big-calendar";

export interface Workout {
  id: number;
  name: string;
  type: string;
  description: string;
  duration: number;
  calories: number;
  difficulty: string;
  lastPerformed: string | null;
  image: string;
  exercises: ExerciseDetail[];
  notes?: string;
}

export interface ExerciseDetail {
  muscleGroups: string[];
  name: string;
  sets: number;
  reps?: number | string;
  duration?: string;
  weight?: string;
  rest: number;
  notes: string;
}


export interface Goal {
  id: string;
  title: string;
  type: 'Weight' | 'Workout Frequency' | 'Performance';
  target: number;
  current: number;
  unit: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface ScheduledWorkout extends Event {
  id: string;
  workoutId: number;
  recurring: boolean;
}