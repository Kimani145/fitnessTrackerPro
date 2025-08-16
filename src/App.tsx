import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { FitnessApp } from './components/FitnessApp';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasSession = localStorage.getItem('fittrack_session');
    if (hasSession) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('fittrack_session', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('fittrack_session');
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Or a proper spinner component
  }

  return (
      <Routes>
        <Route 
          path="/"
          element={!isLoggedIn ? <Home onGetStarted={handleLogin} /> : <Navigate to="/app/dashboard" />}
        />
        <Route 
          path="/app/*"
          element={isLoggedIn ? <FitnessApp onLogout={handleLogout} /> : <Navigate to="/" />}
        />
      </Routes>
  );
}

export default App;