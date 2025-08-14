//import React from 'react';
import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { FitnessApp } from './components/FitnessApp';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'app'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Debug logging
  console.log('App render - currentView:', currentView, 'isLoggedIn:', isLoggedIn);

  // Simulate checking for existing session
  useEffect(() => {
    const hasSession = localStorage.getItem('fittrack_session');
    console.log('Checking session:', hasSession);
    if (hasSession) {
      setIsLoggedIn(true);
      setCurrentView('app');
    }
  }, []);

  const handleLogin = () => {
    console.log('handleLogin called');
    // Simulate login
    localStorage.setItem('fittrack_session', 'true');
    setIsLoggedIn(true);
    setCurrentView('app');
  };

  const handleLogout = () => {
    console.log('handleLogout called');
    localStorage.removeItem('fittrack_session');
    setIsLoggedIn(false);
    setCurrentView('home');
  };

  if (currentView === 'home' && !isLoggedIn) {
    return <Home onGetStarted={handleLogin} />;
  }

  return (
    <FitnessApp onLogout={handleLogout} />
  );
}

export default App;
