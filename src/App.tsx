import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
// old components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

// new components
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
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<Register onLogin={handleLogin} />}
          />
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
          <Route
            path="/_login"
            element={<NLogin onLogin={handleLogin} />}
          />
          <Route
            path="/_register"
            element={<NRegister onLogin={handleLogin} />}
          />
          <Route
            path="/_dashboard/*"
            element={
              isAuthenticated ? (
                <NDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/_login" />
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
