import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Moon, Sun, LogOut, FileText } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <FileText size={28} color="var(--accent-primary)" />
          AI CV Gen
        </Link>
        <div className="nav-actions">
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          {user ? (
            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.6rem 1.25rem' }}>
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <Link to="/login" className="btn-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
