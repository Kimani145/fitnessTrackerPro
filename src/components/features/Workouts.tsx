import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  Flame,
  Play,
  MoreVertical
} from 'lucide-react';

import { getWorkouts, initializeWorkouts } from '../services/workoutService';
import { Workout } from '../services/types';

//export const Workouts: React.FC = () => {
  

export const Workouts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate();
  const [workouts] = useState<Workout[]>(getWorkouts());

  const workoutTypes = ['all', 'Strength', 'Cardio', 'Flexibility', 'Circuit'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'secondary';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Strength': return 'primary';
      case 'Cardio': return 'danger';
      case 'Flexibility': return 'success';
      case 'Circuit': return 'warning';
      default: return 'secondary';
    }
  };

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || workout.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Workouts</h1>
          <p className="text-gray-600 mt-1">Choose a workout to get started</p>
        </div>
        <Button icon={Plus} onClick={() => navigate('/app/workouts/new')}>Create Workout</Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search workouts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {workoutTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout) => (
          <Card key={workout.id} className="overflow-hidden" hover>
            <div className="relative">
              <img
                src={workout.image}
                alt={workout.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute top-3 right-3">
                <Button variant="ghost" size="sm" className="bg-white/80 backdrop-blur-sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <div className="absolute bottom-3 left-3">
                <Badge variant={getTypeColor(workout.type) as any}>
                  {workout.type}
                </Badge>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{workout.name}</h3>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {workout.duration} min
                  </div>
                  <div className="flex items-center">
                    <Flame className="w-4 h-4 mr-1" />
                    {workout.calories} cal
                  </div>
                </div>
                <Badge variant={getDifficultyColor(workout.difficulty) as any} size="sm">
                  {workout.difficulty}
                </Badge>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                <p>{workout.exercises.length} exercises</p>
                <p>Last performed: {workout.lastPerformed}</p>
              </div>
              
              <Button 
                className="w-full" 
                icon={Play}
                onClick={() => navigate(`/app/workouts/${workout.id}`)}
              >
                Start Workout
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button onClick={() => navigate('/app/workouts/new')}>Create New Workout</Button>
        </Card>
      )}
    </div>
  );
};