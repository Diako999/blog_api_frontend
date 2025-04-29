import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if access token exists in localStorage and set the login status
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token); // If token exists, set logged in to true, else false
  }, []);
  const handleLogout = () => {
    // Clear the user's tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);  // Update the login status
  };
  return (
    <nav>
      <ul className="flex space-x-4 p-4 bg-blue-600 text-white">
        <li>
          <Link to="/" className="hover:text-yellow-300">Home</Link>
        </li>
        <li>
          <Link to="/create" className="hover:text-yellow-300">Create Post</Link>
        </li>
        {isLoggedIn ? (
          <li><button onClick={handleLogout} className="hover:text-gray-200">Logout</button></li>
        ) : (
          <>
            <li><Link to="/login" className="hover:text-gray-200">Login</Link></li>
            <li><Link to="/register" className="hover:text-gray-200">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
