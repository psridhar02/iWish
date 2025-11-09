import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, getToken, getUsername } from '../utils/auth';
import Logo from './Logo';

export default function Navbar(){
  const navigate = useNavigate();
  const token = getToken();
  const username = getUsername();
  
  // Read and parse the wishlist count from localStorage
  const count = Number(localStorage.getItem('wishlist_count') || 0);

  const logout = () => {
    removeToken();
    localStorage.removeItem('username');
    // Reset wishlist count on logout
    localStorage.removeItem('wishlist_count'); 
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <Logo />
        </Link>

        <div className="flex-1 mx-6">
          <div className="max-w-xl mx-auto">
            <input
              className="w-full border rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-iwish-300"
              placeholder="Search products..."
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/forum" className="text-sm text-gray-600 hover:text-gray-800">Forum</Link>
          <Link to="/wishlist" className="relative text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2">
            {/* Using a simple heart SVG for the icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            Wishlist
            
            {/* Badge displaying the count */}
            {count > 0 && (
                <span className="ml-1 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">{count}</span>
            )}
          </Link>

          {token ? (
            <>
              <div className="text-sm text-gray-700">Hi, <span className="font-medium">{username || 'User'}</span></div>
              <button onClick={logout} className="ml-2 bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-600">Login</Link>
              <Link to="/register" className="ml-2 bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 transition">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}