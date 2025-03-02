import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, LogOut } from 'lucide-react';
import useAuthStore from '../Store/useAuthStore';
import Logo from "../../public/online-test.png"

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="bg-sky-400 text-white shadow-md flex justify-between items-center h-[10vh] px-5 py-1">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
        <img src={Logo} alt="Logo" className="w-8 h-8" />
        <span>AI Test Platform</span>
      </Link>

      <div className="flex items-center gap-2 h-full text-lg">
        <Link to="/" className="hover:bg-white/80 hover:text-black font-semibold transition-colors px-4 py-1 rounded-md active:scale-90">
          Home
        </Link>

        {authUser ? (
          <>
            <Link to="/dashboard" className="hover:bg-white/80 hover:text-black font-semibold transition-colors px-4 py-1 rounded-md active:scale-90">
              Dashboard
            </Link>
            <button
              onClick={() => logout(navigate)}
              className="bg-white flex gap-1 items-center text-sky-600 px-4 py-1 font-semibold rounded-md transition-colors active:scale-90"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:bg-white/80 hover:text-black font-semibold transition-colors px-4 py-1 rounded-md active:scale-90">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-sky-600 px-4 py-1 font-semibold rounded-md transition-colors active:scale-90"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;