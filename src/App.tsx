import { Routes, Route, Navigate } from 'react-router-dom';
import { FitnessApp } from './components/FitnessApp';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setIsLoggedIn(true);
      try {
        setUser(JSON.parse(userInfo));
      } catch (e) {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        setUser(JSON.parse(userInfo));
      } catch (e) {
        setUser(null);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Or a proper spinner component
  }

  return (
      <Routes>
        <Route 
          path="/"
          element={!isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/app/dashboard" />}
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage onLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/app/*"
          element={isLoggedIn ? <FitnessApp user={user} onLogout={handleLogout} theme={theme} setTheme={setTheme} /> : <Navigate to="/login" />}
        />
      </Routes>
  );
}

export default App;