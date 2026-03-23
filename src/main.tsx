import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { initializeWorkouts } from './components/services/workoutService';
import { Logger } from './lib/logger.ts';

// Initialize logging
Logger.appInitialized();

// Initialize workouts data
Logger.dataFetch('Workout Data');
try {
  initializeWorkouts();
  Logger.dataFetchSuccess('Workout Data', '✅ Workouts initialized');
} catch (error) {
  Logger.dataFetchError('Workout Data', error);
}

// Log environment
if (import.meta.env.MODE === 'development') {
  Logger.info('Development Mode Enabled');
  console.log('%c📚 App Version: 1.0.0', 'color: #665dff; font-weight: bold;');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);