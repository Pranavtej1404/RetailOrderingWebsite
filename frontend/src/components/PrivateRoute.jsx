import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ requireAdmin = false }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading Auth State...</div>;
  }

  if (!isAuthenticated) {
    // Save the current attempted location if you want to redirect later
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user?.role !== 'ADMIN') {
    // If Admin route but user is not admin, deny access
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
