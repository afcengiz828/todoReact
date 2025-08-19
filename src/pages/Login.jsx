// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { loginUser, clearError } from '../redux/features/AuthSlice.js';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = useSelector((state) => state.auth);

  useEffect(() => {
    // Eğer zaten login olduysa dashboard'a yönlendir
    console.log(selector.isAuthenticated);
    if (selector.isAuthenticated) {
      console.log(selector.isAuthenticated)
      navigate('/dashboard');
    }
  }, [selector.isAuthenticated, navigate]);

  useEffect(() => {
    // Component unmount olduğunda error'ı temizle
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return;
    }

    try {
      const result = await dispatch(loginUser(formData));

      if (loginUser.fulfilled.match(result)) {
        // Anında yönlendir
        navigate('/dashboard', { replace: true });
      } else if (loginUser.rejected.match(result)) {
        // console.error('💥 Login başarısız:', result.payload);
      }
    } catch (error) {
      // console.error('🔥 Login error:', error);
    }
  };

  const handleRegisterClick = () => {
    navigate('/Register', { replace: true });
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute top-10 right-1/3 w-28 h-28 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      {/* Register Button - Top Right */}
      <button
        onClick={handleRegisterClick}
        className="absolute top-6 right-6 flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 hover:text-gray-900 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-gray-200/50"
      >
        <Sparkles className="h-4 w-4" />
        <span>Kayıt Ol</span>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Hoş Geldiniz! 👋
          </h1>
          <p className="text-gray-600 text-lg">Hesabınıza giriş yapın</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 p-8 relative overflow-hidden">
          
          {/* Card Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-400/10 to-red-400/10 rounded-full blur-xl"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            {/* Error Message */}
            {selector.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  {selector.error}
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">
                E-posta
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white/80 focus:bg-white placeholder-gray-400"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white/80 focus:bg-white placeholder-gray-400"
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={selector.isLoading || !isFormValid}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${
                selector.isLoading || !isFormValid
                  ? 'bg-gray-400 cursor-not-allowed scale-100 hover:scale-100'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              {selector.isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Giriş yapılıyor...
                </div>
              ) : (
                <>
                  <span>Giriş Yap</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>

            {/* Register Link */}
            <div className="text-center pt-4 border-t border-gray-200/50">
              <p className="text-gray-600 mb-3">
                Hesabınız yok mu?
              </p>
              <button
                type="button"
                onClick={handleRegisterClick}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold hover:scale-105 transition-all duration-300 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl"
              >
                <Sparkles className="h-4 w-4" />
                Hemen Kayıt Olun
              </button>
            </div>
          </form>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Güvenli ve hızlı giriş ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;