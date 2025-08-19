import React, { useState, useEffect } from 'react';
import { getWorkouts } from '../services/workoutService';
import { Workout } from '../services/types';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';

interface ScheduleFormProps {
  onSave: (data: { workoutId: number; date: Date; recurring: boolean }) => void;
  onClose: () => void;
  selectedDate: Date | null;
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({ onSave, onClose, selectedDate }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  // keep selectedWorkout as a string (DOM select values are strings)
  const [selectedWorkout, setSelectedWorkout] = useState<string>('');
  const [date, setDate] = useState(selectedDate || new Date());
  const [recurring, setRecurring] = useState(false);

  useEffect(() => {
    setWorkouts(getWorkouts());
  }, []);

  const handleSave = () => {
    if (selectedWorkout) {
      onSave({
        workoutId: Number(selectedWorkout),
        date,
        recurring,
      });
      onClose();
    }
  };

  return (
    <div className="space-y-4">
      <Select
        label="Workout"
        value={selectedWorkout}
        onChange={(value: string) => setSelectedWorkout(value)}
        options={[
          { value: '', label: 'Select a workout', disabled: true },
          ...workouts.map(workout => ({
            value: String(workout.id),
            label: workout.name
          }))
        ]}
      />
      <Input
        label="Date"
        type="date"
        value={date.toISOString().split('T')[0]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(new Date(e.target.value))}
      />
      <Switch
        label="Repeat Weekly"
        checked={recurring}
        // use onCheckedChange which is common for controlled Switch components
        onCheckedChange={(v: boolean) => setRecurring(Boolean(v))}
      />
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Schedule</Button>
      </div>
    </div>
  );
};