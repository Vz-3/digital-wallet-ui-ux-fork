import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Login from './modules/core/components/Login';
import Register from './modules/core/components/Register';
import Dashboard from './modules/core/components/Dashboard';
import {
  checkToken,
  logout,
} from './modules/core/services/apiAuthService';
import useDarkTheme from './modules/core/hooks/useDarkTheme';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(checkToken);
  const [,] = useDarkTheme();

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };
  // Most of the codebase lacks proper validation.
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard/*"
            element={
              isAuthenticated ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// change /register to it's own component.
export default App;
