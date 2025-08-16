import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { 
  addWorkout, 
  getWorkoutTypes, 
  getDifficulties, 
  getExerciseLibrary, 
  getWorkouts
} from '../services/workoutService';
import { Workout, ExerciseDetail } from '../services/types';

export const CreateWorkoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(getWorkoutTypes()[0] || '');
  const [difficulty, setDifficulty] = useState(getDifficulties()[0] || '');
  const [duration, setDuration] = useState(0);
  const [calories, setCalories] = useState(0);
  const [selectedExercises, setSelectedExercises] = useState<ExerciseDetail[]>([]);

  useEffect(() => {
    setWorkouts(getWorkouts());
  }, []);

  useEffect(() => {
    if (selectedTemplateId) {
      const template = workouts.find(w => w.id === Number(selectedTemplateId));
      if (template) {
        setName(`${template.name} (Copy)`);
        setDescription(template.description);
        setType(template.type);
        setDifficulty(template.difficulty);
        setDuration(template.duration);
        setCalories(template.calories);
        setSelectedExercises(template.exercises);
      }
    } else {
      setName('');
      setDescription('');
      setType(getWorkoutTypes()[0] || '');
      setDifficulty(getDifficulties()[0] || '');
      setDuration(0);
      setCalories(0);
      setSelectedExercises([]);
    }
  }, [selectedTemplateId, workouts]);

  const exerciseLibrary = getExerciseLibrary();

  const handleAddExercise = (exerciseId: string) => {
    const exercise = exerciseLibrary.find(e => e.id === Number(exerciseId));
    if (exercise) {
      const newExerciseDetail: ExerciseDetail = {
        name: exercise.name,
        sets: 3,
        reps: 12,
        weight: '',
        rest: 60,
        notes: '',
        muscleGroups: exercise.muscleGroups,
      };
      setSelectedExercises([...selectedExercises, newExerciseDetail]);
    }
  };

  const handleExerciseChange = (
    index: number,
    field: keyof ExerciseDetail,
    value: string | number
  ) => {
    const updatedExercises = [...selectedExercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };
    setSelectedExercises(updatedExercises);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newWorkout: Omit<Workout, 'id'> = {
      name,
      description,
      type,
      difficulty,
      duration,
      calories,
      exercises: selectedExercises,
      image: 'https://via.placeholder.com/400x200', // Placeholder image
      lastPerformed: new Date().toLocaleDateString(),
    };
    addWorkout(newWorkout);
    navigate('/app/workouts');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Create New Workout</h1>
      <form onSubmit={handleSubmit}>
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Create from Template</label>
            <select 
              value={selectedTemplateId} 
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">None</option>
              {workouts.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
            </select>
          </div>
          <Input label="Workout Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Duration (minutes)" type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} required />
            <Input label="Calories Burned" type="number" value={calories} onChange={(e) => setCalories(Number(e.target.value))} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Workout Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                {getWorkoutTypes().map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                {getDifficulties().map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Exercises</h3>
            <div className="space-y-4">
              {selectedExercises.map((ex, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 border rounded-lg">
                  <div className="flex-1">{ex.name}</div>
                  <Input label="Sets" type="number" value={ex.sets} onChange={(e) => handleExerciseChange(index, 'sets', Number(e.target.value))} />
                  <Input label="Reps" type="number" value={ex.reps} onChange={(e) => handleExerciseChange(index, 'reps', Number(e.target.value))} />
                  <Input label="Weight" value={ex.weight || ''} onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)} />
                </div>
              ))}
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Add Exercise</label>
                <select onChange={(e) => handleAddExercise(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="">Select an exercise</option>
                    {exerciseLibrary.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
                </select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Create Workout</Button>
          </div>
        </Card>
      </form>
    </div>
  );
};