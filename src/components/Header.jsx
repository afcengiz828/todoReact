import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setDark } from '../redux/features/todo/ThemeSlice';
import { logoutUser } from '../redux/features/AuthSlice';
import { User, LogOut, Sun, Moon, List, Plus, Tag, Menu, X } from 'lucide-react';
import ModalUser from './ModalUser';

const Header = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state.auth);
    const darkSelector = useSelector(state => state.dark);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const userName = localStorage.getItem("userName");  

    const [userModal, setUserModal] = useState({
        isOpen: false,
        todoId: null,
        todoText: ""
    });

    const openUserModal = () => {
        setUserModal({
            isOpen: true,
        });
    };

    const closeUserModal = () => {
        setUserModal({
            isOpen: false,
            todoId: null,
            todoText: ""
        });

    };

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    const toggleTheme = () => {
        dispatch(setDark());
    }

    const navigationItems = [
        { to: '/todos', icon: List, label: 'Liste', color: 'text-blue-500' },
        { to: '/addtodos', icon: Plus, label: 'Ekle', color: 'text-green-500' },
        { to: '/categories', icon: Tag, label: 'Kategoriler', color: 'text-purple-500' }
    ];

    return (
        <header className={` bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20 shadow-lg transition-all duration-300 ${
            userModal.isOpen ? 'z-30' : 'z-40'
        }`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    
                    {/* Logo */}
                    <Link to='/dashboard' className="flex-shrink-0">
                        <div className="group cursor-pointer">
                            <h1 className='font-bold text-3xl lg:text-4xl text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text hover:from-amber-300 hover:via-orange-400 hover:to-red-400 transition-all duration-300 transform group-hover:scale-105'>
                                TODO
                            </h1>
                            <div className="h-1 bg-gradient-to-r from-amber-400 to-red-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="group relative px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                            >
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                                    <item.icon className={`h-5 w-5 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                                    <span className="font-medium text-sm lg:text-base">{item.label}</span>
                                </div>
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-red-500 group-hover:w-full transition-all duration-300"></div>
                            </Link>
                        ))}
                    </nav>

                    {/* User Actions */}
                    <div className="flex items-center gap-2 lg:gap-4">
                        
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 lg:p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 group"
                            aria-label="Toggle theme"
                        >
                            {darkSelector.dark ? (
                                <Sun className="h-5 w-5 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" />
                            ) : (
                                <Moon className="h-5 w-5 text-indigo-500 group-hover:-rotate-12 transition-transform duration-300" />
                            )}
                        </button>

                        {/* User Profile */}
                        <button
                            onClick={openUserModal}
                            className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
                        >
                            <User className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                            <span className="hidden lg:block font-medium text-sm">
                                {userName.split(' ')[0] || 'Profil'}
                            </span>
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
                        >
                            <LogOut className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            <span className="hidden sm:block">Çıkış</span>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                            ) : (
                                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl mt-2 shadow-xl border border-gray-200/20 dark:border-gray-700/20">
                            {navigationItems.map((item, index) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
                                    style={{ 
                                        animationDelay: `${index * 0.1}s`,
                                        animation: 'slideInRight 0.4s ease-out forwards'
                                    }}
                                >
                                    <item.icon className={`h-5 w-5 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                                    <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                                        {item.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* User Modal */}
            <ModalUser
                isOpen={userModal.isOpen}
                onClose={closeUserModal}
                title="Kullanıcı Bilgileri"
            />

            <style jsx>{`
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </header>
    )
}

export default Header