import { Routes, Route, Navigate } from 'react-router-dom';
import { FitnessApp } from './components/FitnessApp';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LandingPage from './pages/LandingPage';
import { getCurrentUserProfile, observeAuthState, signOutCurrentUser, type UserProfile } from './firebase/auth';
import { getErrorMessage } from './lib/errors';
import { Logger } from './lib/logger';
import { seedWorkoutsIfNeeded } from './firebase/workouts';

function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Initialize app
  useEffect(() => {
    Logger.appInitialized();
    Logger.themeInitialized(theme);
    
    // Check browser's system theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    Logger.browserThemePreference(prefersDark);
  }, []);

  // Monitor network connectivity
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      Logger.info('Connection restored', '✅ Now online');
    };

    const handleOffline = () => {
      setIsOnline(false);
      Logger.warning('Connection lost', '⚠️ You are offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auth state listener
  useEffect(() => {
    Logger.authStateInitialized();

    const unsubscribe = observeAuthState(async (firebaseUser) => {
      setAuthError('');
      Logger.authStateChanged(firebaseUser);

      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        Logger.debug('No authenticated user');
        return;
      }

      try {
        Logger.dataFetch('User Profile');
        const profile = await getCurrentUserProfile(firebaseUser);
        Logger.userProfileLoaded(profile);
        setUser(profile);

        // Ensure starter workouts exist in Firestore for first-time setup.
        try {
          await seedWorkoutsIfNeeded();
        } catch (seedError) {
          Logger.warning('Workout seed skipped/failed', seedError);
        }
      } catch (error) {
        setUser(null);
        const errorMessage = getErrorMessage(error, 'Failed to restore your session.');
        Logger.authError(errorMessage);
        setAuthError(errorMessage);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // Theme management
  useEffect(() => {
    Logger.themeChanged(theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = async () => {
    try {
      Logger.debug('Logout initiated');
      await signOutCurrentUser();
      Logger.info('User logged out successfully');
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Sign out failed. Please try again.');
      Logger.authError(errorMessage);
      setAuthError(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading your workspace...</p>
          {!isOnline && <p className="text-red-600 text-sm mt-2">🔌 You appear to be offline</p>}
        </div>
      </div>
    );
  }

  return (
    <>
      {!isOnline && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 px-4 py-3">
          <p className="text-sm text-yellow-800 dark:text-yellow-300 font-medium">
            🔌 You are currently offline. Some features may be limited.
          </p>
        </div>
      )}

      {authError && (
        <div className="mx-4 mt-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          {authError}
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={!user ? <LandingPage /> : <Navigate to="/app/workouts" />}
        />
        <Route path="/login" element={user ? <Navigate to="/app/workouts" /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Navigate to="/app/workouts" /> : <SignupPage />} />
        <Route path="/forgot-password" element={user ? <Navigate to="/app/workouts" /> : <ForgotPasswordPage />} />
        <Route
          path="/app/*"
          element={user ? <FitnessApp user={user} onLogout={handleLogout} theme={theme} setTheme={setTheme} /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;