import React, { useState } from 'react';
import { Goal } from '../services/types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface GoalFormProps {
  onSave: (goal: Omit<Goal, 'id' | 'completed' | 'createdAt' | 'current'>) => void;
  onClose: () => void;
}

export const GoalForm: React.FC<GoalFormProps> = ({ onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Weight' | 'Workout Frequency' | 'Performance'>('Workout Frequency');
  const [target, setTarget] = useState(0);
  const [unit, setUnit] = useState('workouts');

  const handleSave = () => {
    onSave({
      title,
      type,
      target,
      unit,
    });
    onClose();
  };

  return (
    <div className="space-y-4">
      <Input
        label="Goal Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g., Run a 5k"
      />
      <Select
        label="Goal Type"
        value={type}
        options={[
          { value: 'Workout Frequency', label: 'Workout Frequency' },
          { value: 'Weight', label: 'Weight' },
          { value: 'Performance', label: 'Performance' }
        ]}
        onChange={(value) => setType(value as 'Weight' | 'Workout Frequency' | 'Performance')}
      />
      <Input
        label="Target"
        type="number"
        value={target}
        onChange={(e) => setTarget(Number(e.target.value))}
      />
      <Input
        label="Unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        placeholder="e.g., kg, miles, reps"
      />
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save Goal</Button>
      </div>
    </div>
  );
};