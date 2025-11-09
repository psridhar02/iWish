import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { removeToken, getToken, getUsername } from '../utils/auth';
import Logo from './Logo';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getToken();
  const username = getUsername();
  const count = Number(localStorage.getItem('wishlist_count') || 0);

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem('username');
    localStorage.removeItem('wishlist_count');
    navigate('/');
  };

  // Read saved categories
  const savedCats = JSON.parse(localStorage.getItem('iwish_categories') || '["All"]');
  const params = new URLSearchParams(location.search);
  const activeCat = params.get("category") || "All";

  return (
    <nav
      className="sticky top-0 z-50 shadow-md backdrop-blur-md border-b border-purple-100"
      style={{
        background: 'linear-gradient(90deg, #fdf6ff 0%, #f8f1ff 100%)',
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        
        {/* --- LEFT: Logo + iWish --- */}
        <Link to="/" className="flex items-center gap-3 group">
          <Logo compact={false} />
        </Link>

        {/* --- CENTER: Categories Dropdown + Forum --- */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <button className="text-gray-700 hover:text-purple-700 transition px-3 py-2 rounded-md font-medium">
              Categories ▾
            </button>
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-3 min-w-[200px] opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto z-50">
              {savedCats.map((cat) => (
                <Link
                  key={cat}
                  to={`/?category=${encodeURIComponent(cat)}`}
                  className={`block px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                    activeCat === cat ? 'bg-purple-100 font-semibold text-purple-700' : 'text-gray-700'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/forum"
            className="text-gray-700 hover:text-purple-700 font-medium"
          >
            Forum
          </Link>
        </div>

        {/* --- RIGHT: User Auth + Wishlist + Logout --- */}
        <div className="flex items-center gap-5">
          {username ? (
            <span className="text-sm text-gray-700">
              Welcome,&nbsp;
              <span className="font-semibold text-purple-800">{username}</span>
            </span>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-all shadow-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm text-gray-700 hover:text-purple-700 transition duration-200"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Wishlist Icon */}
          <Link to="/wishlist" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-purple-600 hover:text-red-500 transition-transform transform hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 shadow-sm">
                {count}
              </span>
            )}
          </Link>

          {username && (
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-all shadow-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
