import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  type DocumentData,
} from 'firebase/firestore';
import { AppError, toAppError } from '../lib/errors';
import type { ExerciseDetail, Workout } from '../components/services/types';
import { auth, db, assertFirebaseConfigured } from './config';

type SeedWorkout = Omit<Workout, 'id'> & {
  category: 'Chest' | 'Abs' | 'Legs' | 'Kegels';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
};

const seedWorkouts: SeedWorkout[] = [
  {
    name: 'Chest Foundation',
    type: 'Strength',
    category: 'Chest',
    level: 'Beginner',
    description: 'Beginner chest routine focused on form, tempo, and full range of motion.',
    duration: 30,
    calories: 180,
    difficulty: 'Beginner',
    lastPerformed: null,
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
    exercises: [
      { name: 'Incline Push-up', sets: 3, reps: 12, rest: 45, notes: 'Hands on bench, slow lowering', muscleGroups: ['Chest', 'Triceps'] },
      { name: 'Dumbbell Floor Press', sets: 3, reps: 10, rest: 60, notes: 'Control each rep', muscleGroups: ['Chest', 'Shoulders'] },
      { name: 'Chest Fly (Light)', sets: 2, reps: 12, rest: 45, notes: 'Keep elbows soft', muscleGroups: ['Chest'] },
    ],
  },
  {
    name: 'Chest Builder',
    type: 'Strength',
    category: 'Chest',
    level: 'Intermediate',
    description: 'Intermediate chest routine to build pressing strength and volume capacity.',
    duration: 40,
    calories: 260,
    difficulty: 'Intermediate',
    lastPerformed: null,
    image: 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 8, rest: 75, notes: 'Stop 1-2 reps before failure', muscleGroups: ['Chest', 'Triceps'] },
      { name: 'Incline Dumbbell Press', sets: 3, reps: 10, rest: 60, notes: 'Squeeze at top', muscleGroups: ['Chest', 'Shoulders'] },
      { name: 'Push-up', sets: 3, reps: 15, rest: 45, notes: 'Tight core', muscleGroups: ['Chest', 'Core'] },
    ],
  },
  {
    name: 'Chest Power Peak',
    type: 'Strength',
    category: 'Chest',
    level: 'Advanced',
    description: 'Advanced chest strength and hypertrophy protocol for heavy and explosive work.',
    duration: 55,
    calories: 360,
    difficulty: 'Advanced',
    lastPerformed: null,
    image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg',
    exercises: [
      { name: 'Paused Bench Press', sets: 5, reps: 5, rest: 120, notes: '1-second pause on chest', muscleGroups: ['Chest', 'Triceps'] },
      { name: 'Weighted Dips', sets: 4, reps: 8, rest: 90, notes: 'Controlled depth', muscleGroups: ['Chest', 'Triceps'] },
      { name: 'Cable Fly', sets: 3, reps: 12, rest: 60, notes: 'Constant tension', muscleGroups: ['Chest'] },
    ],
  },
  {
    name: 'Abs Starter Core',
    type: 'Core',
    category: 'Abs',
    level: 'Beginner',
    description: 'Beginner abdominal routine to build core endurance and trunk stability.',
    duration: 20,
    calories: 110,
    difficulty: 'Beginner',
    lastPerformed: null,
    image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg',
    exercises: [
      { name: 'Dead Bug', sets: 3, reps: 10, rest: 30, notes: 'Keep lower back flat', muscleGroups: ['Abs', 'Core'] },
      { name: 'Plank', sets: 3, duration: '30 sec', rest: 30, notes: 'Breathe steadily', muscleGroups: ['Abs', 'Core'] },
      { name: 'Crunch', sets: 3, reps: 15, rest: 30, notes: 'No neck pulling', muscleGroups: ['Abs'] },
    ],
  },
  {
    name: 'Abs Strength Circuit',
    type: 'Core',
    category: 'Abs',
    level: 'Intermediate',
    description: 'Intermediate abs circuit with anti-rotation and flexion patterns.',
    duration: 28,
    calories: 170,
    difficulty: 'Intermediate',
    lastPerformed: null,
    image: 'https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg',
    exercises: [
      { name: 'Hanging Knee Raise', sets: 4, reps: 10, rest: 45, notes: 'Slow eccentric', muscleGroups: ['Abs', 'Hip Flexors'] },
      { name: 'Russian Twist', sets: 3, reps: 20, rest: 30, notes: 'Rotate through torso', muscleGroups: ['Abs', 'Obliques'] },
      { name: 'Side Plank', sets: 3, duration: '30 sec', rest: 30, notes: 'Each side', muscleGroups: ['Obliques', 'Core'] },
    ],
  },
  {
    name: 'Abs Elite Core',
    type: 'Core',
    category: 'Abs',
    level: 'Advanced',
    description: 'Advanced core session emphasizing control under fatigue and loaded trunk work.',
    duration: 35,
    calories: 230,
    difficulty: 'Advanced',
    lastPerformed: null,
    image: 'https://images.pexels.com/photos/2261485/pexels-photo-2261485.jpeg',
    exercises: [
      { name: 'Toes to Bar', sets: 4, reps: 8, rest: 60, notes: 'No swinging', muscleGroups: ['Abs', 'Lats'] },
      { name: 'Ab Wheel Rollout', sets: 4, reps: 10, rest: 60, notes: 'Neutral spine', muscleGroups: ['Abs', 'Core'] },
      { name: 'Weighted Plank', sets: 3, duration: '45 sec', rest: 45, notes: 'Keep hips level', muscleGroups: ['Core', 'Abs'] },
    ],
  },
  {
    name: 'Legs Base Builder',
    type: 'Strength',
    category: 'Legs',
    level: 'Beginner',
    description: 'Beginner lower body workout for movement quality and balanced leg strength.',
    duration: 30,
    calories: 200,
    difficulty: 'Beginner',
    lastPerformed: null,
    image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg',
    exercises: [
      { name: 'Bodyweight Squat', sets: 3, reps: 15, rest: 45, notes: 'Chest up', muscleGroups: ['Quads', 'Glutes'] },
      { name: 'Glute Bridge', sets: 3, reps: 15, rest: 45, notes: 'Squeeze at top', muscleGroups: ['Glutes', 'Hamstrings'] },
      { name: 'Step-up', sets: 3, reps: 10, rest: 45, notes: 'Each side', muscleGroups: ['Quads', 'Glutes'] },
    ],
  },
  {
    name: 'Legs Performance',
    type: 'Strength',
    category: 'Legs',
    level: 'Intermediate',
    description: 'Intermediate leg routine balancing unilateral and bilateral strength.',
    duration: 45,
    calories: 310,
    difficulty: 'Intermediate',
    lastPerformed: null,
    image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
    exercises: [
      { name: 'Barbell Back Squat', sets: 4, reps: 8, rest: 90, notes: 'Controlled descent', muscleGroups: ['Quads', 'Glutes'] },
      { name: 'Romanian Deadlift', sets: 3, reps: 10, rest: 75, notes: 'Hip hinge focus', muscleGroups: ['Hamstrings', 'Glutes'] },
      { name: 'Walking Lunge', sets: 3, reps: 12, rest: 60, notes: 'Each side', muscleGroups: ['Quads', 'Glutes'] },
    ],
  },
  {
    name: 'Legs Power Session',
    type: 'Strength',
    category: 'Legs',
    level: 'Advanced',
    description: 'Advanced leg session with heavy compounds and power output work.',
    duration: 60,
    calories: 430,
    difficulty: 'Advanced',
    lastPerformed: null,
    image: 'https://images.pexels.com/photos/4720236/pexels-photo-4720236.jpeg',
    exercises: [
      { name: 'Front Squat', sets: 5, reps: 5, rest: 120, notes: 'Stay upright', muscleGroups: ['Quads', 'Core'] },
      { name: 'Bulgarian Split Squat', sets: 4, reps: 8, rest: 75, notes: 'Each side', muscleGroups: ['Quads', 'Glutes'] },
      { name: 'Jump Squat', sets: 4, reps: 10, rest: 60, notes: 'Max intent', muscleGroups: ['Quads', 'Glutes'] },
    ],
  },
  {
    name: 'Kegels Basics',
    type: 'Pelvic Floor',
    category: 'Kegels',
    level: 'Beginner',
    description: 'Beginner pelvic floor training with short holds and relaxation control.',
    duration: 12,
    calories: 40,
    difficulty: 'Beginner',
    lastPerformed: null,
    image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg',
    exercises: [
      { name: 'Quick Contractions', sets: 3, reps: 10, rest: 20, notes: 'Contract and release', muscleGroups: ['Pelvic Floor'] },
      { name: 'Hold and Relax', sets: 3, duration: '10 sec', rest: 20, notes: 'Breathe naturally', muscleGroups: ['Pelvic Floor'] },
      { name: 'Bridge with Kegel', sets: 2, reps: 10, rest: 30, notes: 'Engage before lifting hips', muscleGroups: ['Pelvic Floor', 'Glutes'] },
    ],
  },
  {
    name: 'Kegels Progression',
    type: 'Pelvic Floor',
    category: 'Kegels',
    level: 'Intermediate',
    description: 'Intermediate pelvic floor progression with longer holds and posture integration.',
    duration: 16,
    calories: 55,
    difficulty: 'Intermediate',
    lastPerformed: null,
    image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg',
    exercises: [
      { name: 'Stair-step Holds', sets: 3, duration: '20 sec', rest: 20, notes: 'Increase tension gradually', muscleGroups: ['Pelvic Floor'] },
      { name: 'Standing Kegel', sets: 3, reps: 12, rest: 20, notes: 'Neutral pelvis', muscleGroups: ['Pelvic Floor'] },
      { name: 'Dead Bug with Kegel', sets: 3, reps: 8, rest: 30, notes: 'Maintain contraction on extension', muscleGroups: ['Pelvic Floor', 'Core'] },
    ],
  },
  {
    name: 'Kegels Endurance Plus',
    type: 'Pelvic Floor',
    category: 'Kegels',
    level: 'Advanced',
    description: 'Advanced pelvic floor routine combining endurance and dynamic control.',
    duration: 20,
    calories: 70,
    difficulty: 'Advanced',
    lastPerformed: null,
    image: 'https://images.pexels.com/photos/6550823/pexels-photo-6550823.jpeg',
    exercises: [
      { name: 'Long Holds', sets: 4, duration: '30 sec', rest: 25, notes: 'Steady breathing', muscleGroups: ['Pelvic Floor'] },
      { name: 'Pulse Contractions', sets: 4, reps: 15, rest: 20, notes: 'Small controlled pulses', muscleGroups: ['Pelvic Floor'] },
      { name: 'Squat with Kegel Hold', sets: 3, reps: 10, rest: 40, notes: 'Maintain control through movement', muscleGroups: ['Pelvic Floor', 'Legs'] },
    ],
  },
];

function toExerciseArray(value: unknown): ExerciseDetail[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value as ExerciseDetail[];
}

function mapDocToWorkout(id: string, data: DocumentData): Workout {
  return {
    id,
    name: String(data.name || ''),
    type: String(data.type || 'Strength'),
    description: String(data.description || ''),
    duration: Number(data.duration || 0),
    calories: Number(data.calories || 0),
    difficulty: String(data.difficulty || data.level || 'Beginner'),
    lastPerformed: data.lastPerformed ? String(data.lastPerformed) : null,
    image: String(data.image || ''),
    exercises: toExerciseArray(data.exercises),
    notes: typeof data.notes === 'string' ? data.notes : undefined,
  };
}

export async function seedWorkoutsIfNeeded() {
  assertFirebaseConfigured();

  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new AppError('You must be signed in to seed workouts.', {
      code: 'auth/not-authenticated',
    });
  }

  try {
    const workoutsRef = collection(db, 'workouts');
    const existing = await getDocs(query(workoutsRef, limit(1)));

    if (!existing.empty) {
      return;
    }

    const writes = seedWorkouts.map((workout) => {
      const ref = doc(workoutsRef);
      return setDoc(ref, {
        ...workout,
        createdBy: currentUser.uid,
      });
    });

    await Promise.all(writes);
  } catch (error) {
    throw toAppError(error, 'Unable to seed starter workouts.');
  }
}

export async function getWorkoutsFromFirestore(): Promise<Workout[]> {
  assertFirebaseConfigured();

  try {
    const snapshot = await getDocs(collection(db, 'workouts'));

    return snapshot.docs
      .map((docItem) => mapDocToWorkout(docItem.id, docItem.data()))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    throw toAppError(error, 'Failed to load workouts from Firestore.');
  }
}