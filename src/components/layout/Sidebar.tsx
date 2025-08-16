import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Dumbbell, 
  TrendingUp, 
  Users, 
  Target, 
  Settings,
  Calendar,
  Award
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/app/dashboard' },
  { id: 'workouts', label: 'Workouts', icon: Dumbbell, path: '/app/workouts' },
  { id: 'progress', label: 'Progress', icon: TrendingUp, path: '/app/progress' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, path: '/app/calendar' },
  { id: 'goals', label: 'Goals', icon: Target, path: '/app/goals' },
  { id: 'achievements', label: 'Achievements', icon: Award, path: '/app/achievements' },
  { id: 'social', label: 'Social', icon: Users, path: '/app/social' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/app/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setSidebarOpen }) => {
  return (
    <>
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-gray-800">
            <Dumbbell className="w-8 h-8 text-blue-400" />
            <span className="ml-2 text-xl font-bold text-white">FitTrack Pro</span>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `
                    w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};