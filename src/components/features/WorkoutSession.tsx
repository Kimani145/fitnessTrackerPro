import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkoutById, getExerciseByName } from '../services/workoutService';
import { Workout } from '../services/types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const WorkoutSession: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  useEffect(() => {
    if (id) {
      const fetchedWorkout = getWorkoutById(parseInt(id));
      setWorkout(fetchedWorkout || null);
    }
  }, [id]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (!isPaused) {
      timer = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
        // Approximate calories burned per second
        if (workout) {
            const caloriesPerSecond = workout.calories / (workout.duration * 60);
            setCaloriesBurned(prevCalories => prevCalories + caloriesPerSecond);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPaused, workout]);

  if (!workout) {
    return <div>Loading workout...</div>;
  }

  const currentExercise = workout.exercises[currentExerciseIndex];
  const exerciseDetails = getExerciseByName(currentExercise.name);

  const handleNextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(prevIndex => prevIndex + 1);
    } else {
      // Workout finished
      navigate('/app/workouts');
    }
  };

  const handleSkipExercise = () => {
    handleNextExercise();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentExerciseIndex + 1) / workout.exercises.length) * 100;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <div>
            <h1 className="text-2xl font-bold">{workout.name}</h1>
            <p className="text-gray-500">Exercise {currentExerciseIndex + 1} of {workout.exercises.length}</p>
        </div>
        <div className="text-right">
          <p className="text-lg">Time: {formatTime(elapsedTime)}</p>
          <p className="text-lg">Calories: {Math.round(caloriesBurned)}</p>
        </div>
        <Button onClick={() => navigate('/app/workouts')}>Exit</Button>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Current Exercise */}
      <Card className="mb-4">
        <div className="grid md:grid-cols-2 gap-4">
            <div>
                <img src={workout.image} alt={currentExercise.name} className="rounded-lg w-full h-64 object-cover" />
            </div>
            <div>
                <h2 className="text-xl font-bold mb-2">{currentExercise.name}</h2>
                <p><strong>Target Muscles:</strong> {exerciseDetails ? exerciseDetails.muscleGroups.join(', ') : 'N/A'}</p>
                <p><strong>Difficulty:</strong> {workout.difficulty}</p>
                <p><strong>Reps:</strong> {currentExercise.reps}</p>
                <p><strong>Sets:</strong> {currentExercise.sets}</p>
                <p><strong>Rest:</strong> {currentExercise.rest} seconds</p>
            </div>
        </div>
      </Card>

        {/* Next Exercise Preview */}
        {currentExerciseIndex < workout.exercises.length - 1 && (
            <div className="text-center mb-4">
                <p className="text-gray-500">Next up: {workout.exercises[currentExerciseIndex + 1].name}</p>
            </div>
        )}


      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <Button onClick={() => setIsPaused(!isPaused)}>{isPaused ? 'Start' : 'Pause'}</Button>
        <Button onClick={handleNextExercise}>Mark Complete</Button>
        <Button onClick={handleSkipExercise} variant="outline">Skip</Button>
      </div>
    </div>
  );
};

export default WorkoutSession;