import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ArrowLeft, Play, MoreVertical } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { getWorkoutById } from '../services/workoutService';
import { Workout, ExerciseDetail as Exercise } from '../services/types';

const WorkoutDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const workout = getWorkoutById(Number(id)); 

  if (!workout) {
    return <div>Workout not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Workouts
        </Button>
        <div className="flex space-x-2">
          <Button onClick={() => navigate(`/app/workouts/session/${id}`)}><Play className="mr-2 h-4 w-4" />Start Workout</Button>
          <Button variant="ghost" icon={MoreVertical} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-start">
          <div>
            <Badge>{workout.type}</Badge>
            <h1 className="text-3xl font-bold mt-2">{workout.name}</h1>
            <p className="text-gray-600 mt-1">{workout.description}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Workout ID: {id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900">Workout Details</h3>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{workout.duration} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Calories</span>
                <span className="font-medium">{workout.calories} cal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Difficulty</span>
                <Badge>{workout.difficulty}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Performed</span>
                <span className="font-medium">{workout.lastPerformed}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-medium text-gray-900 mb-4">Exercises ({workout.exercises.length})</h3>
            <div className="space-y-4">
              {workout.exercises.map((exercise: Exercise, index: number) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{exercise.name}</h4>
                    <Badge>
                      {exercise.sets} sets × {exercise.reps} reps
                    </Badge>
                  </div>
                  {exercise.weight && (
                    <div className="mt-2 text-sm text-gray-600">
                      Weight: {exercise.weight}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;