import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../Store/useAuthStore';

const ProtectedRoute = ({ children }) => {
  const { authUser, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return <>{authUser?children:<Navigate to="/login"/>}</>;
};

export default ProtectedRoute;