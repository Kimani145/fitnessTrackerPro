import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Camera,
  Scale,
  Ruler,
  Target,
  Award
} from 'lucide-react';

export const Progress: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const stats = [
    {
      label: 'Current Weight',
      value: '165 lbs',
      change: '-3.2 lbs',
      trend: 'down',
      icon: Scale,
      color: 'text-green-600'
    },
    {
      label: 'Body Fat %',
      value: '12.5%',
      change: '-1.8%',
      trend: 'down',
      icon: Target,
      color: 'text-blue-600'
    },
    {
      label: 'Muscle Mass',
      value: '145 lbs',
      change: '+2.1 lbs',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      label: 'BMI',
      value: '22.4',
      change: '-0.5',
      trend: 'down',
      icon: Ruler,
      color: 'text-orange-600'
    }
  ];

  const measurements = [
    { part: 'Chest', current: '42"', previous: '41"', change: '+1"' },
    { part: 'Waist', current: '32"', previous: '34"', change: '-2"' },
    { part: 'Arms', current: '15"', previous: '14.5"', change: '+0.5"' },
    { part: 'Thighs', current: '24"', previous: '23.5"', change: '+0.5"' },
  ];

  const achievements = [
    {
      title: 'First 10K Steps',
      description: 'Walked 10,000 steps in a single day',
      date: '2 days ago',
      icon: Award,
      color: 'text-yellow-600'
    },
    {
      title: 'Consistency King',
      description: 'Worked out 7 days in a row',
      date: '1 week ago',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Strength Milestone',
      description: 'Bench pressed your body weight',
      date: '2 weeks ago',
      icon: TrendingUp,
      color: 'text-green-600'
    }
  ];

  const progressPhotos = [
    {
      date: 'Jan 2024',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=200',
      label: 'Starting Point'
    },
    {
      date: 'Mar 2024',
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=200',
      label: '2 Months'
    },
    {
      date: 'May 2024',
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=200',
      label: '4 Months'
    },
    {
      date: 'Current',
      image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=200',
      label: '6 Months'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
          <p className="text-gray-600 mt-1">Monitor your fitness journey</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          <Button icon={Camera}>Add Photo</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          const trendColor = stat.trend === 'up' ? 'text-green-600' : 'text-red-600';
          
          return (
            <Card key={index}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-gray-100`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center text-sm ${trendColor}`}>
                  <TrendIcon className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Body Measurements */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Body Measurements</h2>
            <Button variant="ghost" size="sm">Update</Button>
          </div>
          <div className="space-y-4">
            {measurements.map((measurement, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{measurement.part}</h3>
                  <p className="text-sm text-gray-600">Previous: {measurement.previous}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{measurement.current}</p>
                  <p className={`text-sm ${measurement.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {measurement.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Achievements</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg bg-white`}>
                    <Icon className={`w-5 h-5 ${achievement.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{achievement.description}</p>
                    <p className="text-xs text-gray-500">{achievement.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Progress Photos */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Progress Photos</h2>
          <Button variant="ghost" size="sm" icon={Camera}>Add Photo</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {progressPhotos.map((photo, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-3">
                <img
                  src={photo.image}
                  alt={photo.label}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <Badge 
                  variant="secondary" 
                  className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm"
                >
                  {photo.label}
                </Badge>
              </div>
              <p className="text-sm font-medium text-gray-900">{photo.date}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Chart Placeholder */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Weight Progress Chart</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Chart visualization would go here</p>
            <p className="text-sm text-gray-500">Integration with Chart.js or similar library</p>
          </div>
        </div>
      </Card>
    </div>
  );
};