import React from 'react';
import { useAuth } from '../AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-left">
          <h1>Task Manager</h1>
          <span className="nav-subtitle">Full Stack App: React + Flask + MySQL</span>
        </div>
        
        <div className="nav-right">
          {user && (
            <>
              <span className="welcome-text">Welcome, {user.username}!</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;