import React, { useState } from 'react';
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { Dashboard } from './features/Dashboard';
import { Workouts } from './features/Workouts';
import { Progress } from './features/Progress';

interface FitnessAppProps {
  onLogout: () => void;
}

export const FitnessApp: React.FC<FitnessAppProps> = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Debug logging
  console.log('FitnessApp render - activeTab:', activeTab, 'sidebarOpen:', sidebarOpen);

  const handleTabChange = (tab: string) => {
    console.log('Tab change requested:', tab);
    setActiveTab(tab);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const renderContent = () => {
    console.log('Rendering content for tab:', activeTab);
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={handleTabChange} />;
      case 'workouts':
        return <Workouts onNavigate={handleTabChange} />;
      case 'progress':
        return <Progress />;
      case 'calendar':
        return <div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900">Calendar Coming Soon</h2></div>;
      case 'goals':
        return <div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900">Goals Coming Soon</h2></div>;
      case 'achievements':
        return <div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900">Achievements Coming Soon</h2></div>;
      case 'social':
        return <div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900">Social Features Coming Soon</h2></div>;
      case 'settings':
        return <div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900">Settings Coming Soon</h2></div>;
      default:
        return <Dashboard onNavigate={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          onLogout={onLogout}
        />
        
        <main className="p-6 flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};