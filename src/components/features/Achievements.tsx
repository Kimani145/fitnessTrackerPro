import React from 'react';
import { Card } from '../ui/Card';

interface Achievement {
  id: string;
  name: string;
  description: string;
  threshold: number;
  currentProgress: number;
  unit: string;
  unlocked: boolean;
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first recorded workout.',
    threshold: 1,
    currentProgress: 1,
    unit: 'workouts',
    unlocked: true,
  },
  {
    id: '2',
    name: 'Consistent Effort',
    description: 'Log 7 workouts in a single week.',
    threshold: 7,
    currentProgress: 5,
    unit: 'workouts',
    unlocked: false,
  },
  {
    id: '3',
    name: 'Marathoner',
    description: 'Log a total of 42.2 km in running workouts.',
    threshold: 42.2,
    currentProgress: 15.5,
    unit: 'km',
    unlocked: false,
  },
  {
    id: '4',
    name: 'Strength Builder',
    description: 'Lift a cumulative total of 1000 kg.',
    threshold: 1000,
    currentProgress: 1200,
    unit: 'kg',
    unlocked: true,
  },
  {
    id: '5',
    name: 'Early Bird',
    description: 'Complete a workout before 7 AM.',
    threshold: 1,
    currentProgress: 0,
    unit: 'workouts',
    unlocked: false,
  },
];

const Achievements: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAchievements.map((achievement) => (
          <Card key={achievement.id} className={`p-6 ${achievement.unlocked ? 'bg-green-50 dark:bg-green-900' : 'bg-white dark:bg-gray-800'}`}>
            <div className="flex items-center mb-4">
              <span className={`text-4xl mr-4 ${achievement.unlocked ? 'text-green-600' : 'text-gray-400'}`}>
                {achievement.unlocked ? '🏆' : '🏅'}
              </span>
              <div>
                <h2 className={`text-xl font-semibold ${achievement.unlocked ? 'text-green-800 dark:text-green-300' : 'text-gray-800 dark:text-gray-200'}`}>
                  {achievement.name}
                </h2>
                <p className={`text-sm ${achievement.unlocked ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  {achievement.description}
                </p>
              </div>
            </div>
            {!achievement.unlocked && (
              <div className="mt-4">
                <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{`${achievement.currentProgress} / ${achievement.threshold} ${achievement.unit}`}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(achievement.currentProgress / achievement.threshold) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            {achievement.unlocked && (
              <p className="mt-4 text-sm font-medium text-green-700 dark:text-green-400">Unlocked!</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
