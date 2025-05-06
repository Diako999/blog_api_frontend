import {React, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from './ToasContext';
function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const toast= useToast()
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access_token');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    toast('logged out successfully')
    navigate('/');
  };

  return (
    <nav className="shadow-md bg-white dark:bg-gray-800 text-black dark:text-white p-4 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={toggleTheme}
          className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded"
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
        <Link to="/" className="text-xl font-bold">My Blog</Link>
        <div className="space-x-4 flex items-center">
        {isLoggedIn && (
    <span className="text-sm text-gray-500">
      Welcome, {localStorage.getItem('username')}
    </span>
  )}
          {isLoggedIn ? (
            
            <>
              <Link to="/create" className="hover:underline">Create Post</Link>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
