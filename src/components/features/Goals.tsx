import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { GoalForm } from './GoalForm';
import { Goal } from '../services/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Goals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveGoal = (goalData: Omit<Goal, 'id' | 'completed' | 'createdAt' | 'current'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: new Date().toISOString(),
      completed: false,
      createdAt: new Date().toISOString(),
      current: 0,
    };
    setGoals([...goals, newGoal]);
  };

  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Goals</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add New Goal</Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create a New Goal">
        <GoalForm onSave={handleSaveGoal} onClose={() => setIsModalOpen(false)} />
      </Modal>

      <div>
        <h2 className="text-xl font-semibold mb-4">Active Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeGoals.map(goal => (
            <Card key={goal.id} className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold">{goal.title}</h3>
                <p className="text-sm text-gray-500">{goal.type}</p>
                <div className="my-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-700">{goal.current} / {goal.target} {goal.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${(goal.current / goal.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <Button size="sm" onClick={() => { /* Add functionality to update progress */ }}>Update Progress</Button>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Progress Over Time</h2>
        <Card>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activeGoals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" fill="#3b82f6" name="Current Progress" />
              <Bar dataKey="target" fill="#e5e7eb" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Completed Goals</h2>
        <div className="space-y-4">
          {completedGoals.map(goal => (
            <Card key={goal.id} className="line-through text-gray-500">
              {goal.title}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};