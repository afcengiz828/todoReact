import { current } from '@reduxjs/toolkit';
import { User, X, Mail, UserCircle } from 'lucide-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const ModalUser = ({
    isOpen,
    onClose,
    onConfirm,
    itemId,
    itemName = "",
    title = "User Info"
}) => {

    const { loginUser } = useSelector(state => state.user);
    const [user, setUser] = useState(loginUser);
    if (!isOpen) return null;

    const userName = localStorage.getItem("userName");
    const email = localStorage.getItem("email");

    return (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm">
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl transform transition-all duration-300 ease-out scale-100 opacity-100">
                    {/* Modal Header */}
                    <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-2xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white bg-opacity-20 rounded-full">
                                    <UserCircle className="h-6 w-6" />
                                </div>
                                <h2 className="text-xl font-bold">
                                    Kullanıcı Bilgileri
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200 hover:scale-110"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute top-2 right-16 w-20 h-20 bg-white bg-opacity-10 rounded-full blur-xl"></div>
                        <div className="absolute bottom-2 left-16 w-16 h-16 bg-white bg-opacity-10 rounded-full blur-lg"></div>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6">
                        <div className="space-y-4">
                            {/* User Avatar */}
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                                    <User className="h-10 w-10 text-white" />
                                </div>
                            </div>

                            {/* User Information Cards */}
                            <div className="space-y-3">
                                {/* Name Card */}
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                                            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">İsim</p>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{userName}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Email Card */}
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                                            <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">E-posta</p>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white lowercase break-all">
                                                {email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal Actions */}
                    <div className="px-6 pb-6">
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 font-medium hover:scale-105 active:scale-95 shadow-sm"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalUser;