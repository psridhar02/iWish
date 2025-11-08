import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, getToken } from '../utils/auth';

export default function Navbar(){
  const navigate = useNavigate();
  const token = getToken();

  const logout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-wider">ShopSmart</Link>
        <div className="flex items-center space-x-4">
          <Link to="/forum" className="hover:underline">Forum</Link>
          <Link to="/wishlist" className="hover:underline">Wishlist</Link>
          {token ? (
            <button onClick={logout} className="bg-white text-black px-3 py-1 rounded">Logout</button>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 hover:underline">Login</Link>
              <Link to="/register" className="bg-white text-black px-3 py-1 rounded">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
