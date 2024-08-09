import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import NLogin from './modules/core/components/Login';
import NRegister from './modules/core/components/Register';
import NDashboard from './modules/core/components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
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
            element={<NLogin onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<NRegister onLogin={handleLogin} />}
          />
          <Route
            path="/dashboard/*"
            element={
              isAuthenticated ? (
                <NDashboard onLogout={handleLogout} />
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

// change /register to it's own compontent.
export default App;
