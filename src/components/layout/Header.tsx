import React from 'react';
import { Dumbbell, User, Menu, Bell } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  onMenuClick: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            icon={Menu}
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <span className="sr-only">Open menu</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <Dumbbell className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">FitTrack Pro</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" icon={Bell}>
            <span className="sr-only">Notifications</span>
          </Button>
          
          <div className="flex items-center space-x-2 relative group">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">
              John Doe
            </span>
            {onLogout && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};