// src/AppRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TodoDetail from './pages/TodoDetail';
import { TodoListPage } from './pages/TodoListPage';
import Categories from './pages/Categories';
import { AnimatePresence } from 'framer-motion';
import Register from './pages/Register';

const AppRouter = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return (
        <AnimatePresence mode="wait">

            <Routes>
                {/* Public Routes */}
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
                    }
                />

                <Route
                    path="/register"
                    element={
                        <Register />
                    }
                />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/todos"
                    element={
                        <ProtectedRoute>
                            <TodoListPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/addtodos"
                    element={
                        <ProtectedRoute>
                            <TodoDetail />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/addtodos/:id"
                    element={
                        <ProtectedRoute>
                            <TodoDetail />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/tododetail/:id"
                    element={
                        <ProtectedRoute>
                            <TodoDetail />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/categories"
                    element={
                        <ProtectedRoute>
                            <Categories />
                        </ProtectedRoute>
                    }
                />

                {/* Default redirect */}
                <Route
                    path="/"
                    element={
                        <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
                    }
                />

                {/* 404 - Not Found */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AppRouter;
