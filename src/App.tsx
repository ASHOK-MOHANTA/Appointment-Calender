import React, { useState, useEffect } from 'react';
import Login from './components/Login.tsx';
import Calendar from './components/Calendar.tsx';
import { getStoredAuth, setStoredAuth } from './utils/storage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const auth = getStoredAuth();
    setIsAuthenticated(auth.isAuthenticated);
    setIsLoading(false);
  }, []);

  const handleLogin = (success) => {
    setIsAuthenticated(success);
    setStoredAuth({ isAuthenticated: success });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setStoredAuth({ isAuthenticated: false });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated ? (
        <Calendar onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;