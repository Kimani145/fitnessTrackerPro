import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Logger } from '../../lib/logger';

interface ThemeSwitcherProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    Logger.themeChanged(newTheme === 'system' ? 'system (auto)' : newTheme);
    
    if (newTheme === 'system') {
      // Use browser's system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      localStorage.setItem('theme', 'system');
    } else {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    }
    
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle theme"
        title={`Current theme: ${theme}`}
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
          <div className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            Theme
          </div>
          
          <button
            onClick={() => handleThemeChange('light')}
            className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
              theme === 'light'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Sun className="w-4 h-4" />
            Light
          </button>

          <button
            onClick={() => handleThemeChange('dark')}
            className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
              theme === 'dark'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Moon className="w-4 h-4" />
            Dark
          </button>

          <button
            onClick={() => handleThemeChange('system')}
            className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
              theme === 'system'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <span className="w-4 text-center">💻</span>
            System
          </button>

          <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

          <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
            Current: <span className="font-semibold">{theme}</span>
          </div>
        </div>
      )}
    </div>
  );
};
