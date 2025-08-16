import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { Dashboard } from './features/Dashboard';
import { Workouts } from './features/Workouts'; // Keep this import
import { Progress } from './features/Progress';
import  WorkoutDetail from './features/WorkoutDetail';
import { CreateWorkoutPage } from './features/CreateWorkoutPage';
import WorkoutSession from './features/WorkoutSession';

interface FitnessAppProps {
  onLogout: () => void;
}

export const FitnessApp: React.FC<FitnessAppProps> = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          onLogout={onLogout}
        />
        
        <main className="p-6 flex-1 overflow-y-auto">
          <Routes>
            <Route path="./" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="workouts" element={<Workouts />} />
            <Route path="workouts/:id" element={<WorkoutDetail />} />
            <Route path="workouts/create" element={<CreateWorkoutPage />} />
            <Route path="workouts/session/:id" element={<WorkoutSession />} />
            <Route path="progress" element={<Progress />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};