// src/components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { checkAuthStatus } from '../redux/features/AuthSlice';
// import { checkAuthStatus } from '../redux/features/AuthSlice.js';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

   useEffect(() => {
     // Uygulama başlatıldığında auth durumunu kontrol et
     dispatch(checkAuthStatus());
   }, [dispatch]);

  // Loading durumunda spinner göster
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Authenticated değilse login sayfasına yönlendir
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated ise children'ı render et
  return children;
};

export default ProtectedRoute;