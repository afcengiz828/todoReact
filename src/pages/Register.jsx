import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { addUsers } from '../redux/features/user/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const selector = useSelector(state => state.user)
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitted, errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    setIsLoading(selector.loading);
  }, [selector.loading])

  const onSubmit = async (data) => {
    console.log(data);
    const name = data.firstName + " " + data.lastName;
    const object = {
        "name": name,
        "email": data.email,
        "role": "user",
        "password": data.password
    }

    const response = await dispatch(addUsers(object));
    console.log(response);
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute top-10 right-1/3 w-28 h-28 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      {/* Login Button - Top Right */}
      <button
        onClick={handleLoginClick}
        className="absolute top-6 right-6 flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 hover:text-gray-900 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-gray-200/50"
      >
        <LogIn className="h-4 w-4" />
        <span>Giriş Yap</span>
      </button>

      {/* Main Content */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-8 group">
            <div className="relative">
              <div className="text-5xl font-bold group-hover:scale-110 transition-transform duration-300">
                <span className="text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text">TODO</span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 to-red-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold  mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Aramıza Katılın! 🚀
          </h1>
          <p className="text-gray-600 text-lg">Yeni hesap oluşturun</p>
        </div>

        {/* Register Form Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 p-8 relative overflow-hidden">
          
          {/* Card Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-indigo-400/10 rounded-full blur-xl"></div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-purple-600 transition-colors">
                  Ad
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    {...register('firstName', { required: 'Ad gerekli' })}
                    className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white/80 focus:bg-white placeholder-gray-400 ${
                      errors.firstName ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'
                    }`}
                    placeholder="Adınız"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-purple-600 transition-colors">
                  Soyad
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    {...register('lastName', { required: 'Soyad gerekli' })}
                    className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white/80 focus:bg-white placeholder-gray-400 ${
                      errors.lastName ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'
                    }`}
                    placeholder="Soyadınız"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-purple-600 transition-colors">
                E-posta
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  type="email"
                  {...register('email', {
                    required: 'E-posta gerekli',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Geçerli bir e-posta adresi girin',
                    },
                  })}
                  className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white/80 focus:bg-white placeholder-gray-400 ${
                    errors.email ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'
                  }`}
                  placeholder="ornek@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-purple-600 transition-colors">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Şifre gerekli',
                    minLength: {
                      value: 6,
                      message: 'Şifre en az 6 karakter olmalı',
                    },
                  })}
                  className={`w-full pl-12 pr-12 py-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white/80 focus:bg-white placeholder-gray-400 ${
                    errors.password ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitted}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed scale-100 hover:scale-100'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
              }`}
            >
              {isSubmitted ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Kayıt yapılıyor...
                </div>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  <span>Kayıt Ol</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </> 
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-200/50">
              <p className="text-gray-600 mb-3">
                Zaten hesabınız var mı?
              </p>
              <button
                type="button"
                onClick={handleLoginClick}
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold hover:scale-105 transition-all duration-300 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl"
              >
                <LogIn className="h-4 w-4" />
                Hemen Giriş Yapın
              </button>
            </div>
          </form>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Ücretsiz ve güvenli kayıt ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;