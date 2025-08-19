import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { Dashboard } from './features/Dashboard';
import { Workouts } from './features/Workouts';
import { Progress } from './features/Progress';
import  WorkoutDetail from './features/WorkoutDetail';
import { CreateWorkoutPage } from './features/CreateWorkoutPage';
import WorkoutSession from './features/WorkoutSession';
import  Settings from './features/Settings';
import { Goals } from './features/Goals';
import { Schedule } from './features/Schedule';
import Achievements from './features/Achievements';
import Social from './features/Social';

interface FitnessAppProps {
  onLogout: () => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export const FitnessApp: React.FC<FitnessAppProps> = ({ onLogout, theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  

  return (
    <div className="min-h-screen bg-gray-50 flex dark:bg-gray-900">
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
            <Route path="" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="workouts" element={<Workouts />} />
            <Route path="workouts/:id" element={<WorkoutDetail />} />
            <Route path="workouts/create" element={<CreateWorkoutPage />} />
            <Route path="workouts/session/:id" element={<WorkoutSession />} />
            <Route path="progress" element={<Progress />} />
            <Route path="settings" element={<Settings theme={theme} setTheme={setTheme} />} />
            <Route path="goals" element={<Goals />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="social" element={<Social />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};