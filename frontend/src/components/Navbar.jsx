import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, LogOut } from 'lucide-react';
import useAuthStore from '../Store/useAuthStore';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <Brain size={24} />
          <span>AI Test Platform</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-indigo-200 transition-colors">
            Home
          </Link>
          
          {authUser ? (
            <>
              <Link to="/dashboard" className="hover:text-indigo-200 transition-colors">
                Dashboard
              </Link>
              <button 
                onClick={()=>logout(navigate)}
                className="flex items-center space-x-1 hover:text-indigo-200 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-200 transition-colors">
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-100 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;