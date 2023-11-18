import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function ProtectedRoute_User({ isAuthenticated }) {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/Login'); // Redirect to the login page if not authenticated
  }

  return <Outlet />
}

export default ProtectedRoute_User;
