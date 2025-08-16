import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Flame,
  Clock,
  Zap,
  Plus
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const stats = [
    { label: 'Workouts This Week', value: '4', icon: Calendar, color: 'text-blue-600' },
    { label: 'Current Streak', value: '12 days', icon: Flame, color: 'text-orange-600' },
    { label: 'Total Time', value: '8.5 hrs', icon: Clock, color: 'text-green-600' },
    { label: 'Calories Burned', value: '2,340', icon: Zap, color: 'text-purple-600' },
  ];

  const recentWorkouts = [
    { name: 'Upper Body Strength', date: 'Today', duration: '45 min', exercises: 8 },
    { name: 'HIIT Cardio', date: 'Yesterday', duration: '30 min', exercises: 6 },
    { name: 'Leg Day', date: '2 days ago', duration: '60 min', exercises: 10 },
  ];

  const goals = [
    { name: 'Workout 5x per week', progress: 80, current: 4, target: 5 },
    { name: 'Lose 10 lbs', progress: 60, current: 6, target: 10 },
    { name: 'Bench Press 200 lbs', progress: 85, current: 170, target: 200 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600 mt-1">Ready to crush your fitness goals today?</p>
        </div>
        <Button icon={Plus} onClick={() => navigate('/app/workouts')}>Start Workout</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Workouts */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Workouts</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/app/workouts')}>View All</Button>
          </div>
          <div className="space-y-4">
            {recentWorkouts.map((workout, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{workout.name}</h3>
                  <p className="text-sm text-gray-600">{workout.date} • {workout.exercises} exercises</p>
                </div>
                <Badge variant="secondary">{workout.duration}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Goals Progress */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Goal Progress</h2>
            <Button variant="ghost" size="sm" icon={Target} onClick={() => navigate('/app/progress')}>Manage</Button>
          </div>
          <div className="space-y-6">
            {goals.map((goal, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{goal.name}</h3>
                  <span className="text-sm text-gray-600">{goal.current}/{goal.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{goal.progress}% complete</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex-col" onClick={() => navigate('/app/workouts')}>
            <Plus className="w-6 h-6 mb-2" />
            New Workout
          </Button>
          <Button variant="outline" className="h-20 flex-col" onClick={() => navigate('/app/progress')}>
            <TrendingUp className="w-6 h-6 mb-2" />
            Log Progress
          </Button>
          <Button variant="outline" className="h-20 flex-col" onClick={() => navigate('/app/progress')}>
            <Target className="w-6 h-6 mb-2" />
            Set Goal
          </Button>
          <Button variant="outline" className="h-20 flex-col" onClick={() => navigate('/app/workouts')}>
            <Calendar className="w-6 h-6 mb-2" />
            Schedule
          </Button>
        </div>
      </Card>
    </div>
  );
};