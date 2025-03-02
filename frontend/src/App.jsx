import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TestPage from './pages/TestPage';
import { Toaster } from "react-hot-toast"
import useAuthStore from './Store/useAuthStore';

function App() {
  const { checkAuthUser, authUser } = useAuthStore();
  useEffect(() => {
    checkAuthUser();
  }, [checkAuthUser])

  return (
    <Router>
      <div className="min-h-[100vh] bg-gray-50 flex flex-col">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={authUser == null ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={authUser == null ? <Signup /> : <Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test/:id"
              element={
                <ProtectedRoute>
                  <TestPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <footer className="bg-sky-400 text-white h-[10vh] flex items-center justify-center">
          <p>&copy; {new Date().getFullYear()} AI Test Platform. All rights reserved.</p>
        </footer>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;