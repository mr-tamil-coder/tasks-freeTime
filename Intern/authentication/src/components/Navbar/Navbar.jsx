import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="bg-black shadow-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="w-full px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white no-underline">
          Shopify
        </Link>
        {isAuthenticated && (
          <div className="flex gap-8 items-center">
            <Link to="/products" className="text-white font-semibold text-sm no-underline hover:opacity-80 transition-opacity">
              Products
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/profile" className="no-underline cursor-pointer transition-opacity hover:opacity-80">
                <span className="text-white font-semibold text-sm">👤 {user?.firstName || user?.username}</span>
              </Link>
              <button 
                onClick={handleLogout} 
                className="bg-white text-black border-none px-4 py-2 rounded-lg font-semibold cursor-pointer transition-colors text-sm hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
