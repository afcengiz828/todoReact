// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
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

    // console.log('🚀 Dispatching loginUser...');

    try {
      const result = await dispatch(loginUser(formData));

      // console.log('📦 Dispatch result:', result);
      // console.log('✅ Is fulfilled?', loginUser.fulfilled.match(result));
      // console.log('❌ Is rejected?', loginUser.rejected.match(result));

      if (loginUser.fulfilled.match(result)) {
        // console.log('🎉 Login başarılı!');
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Register Button */}
      

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="text-4xl font-bold">
              <span className="text-orange-400">TO</span>
              <span className="text-red-500">DO</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Hesabınıza giriş yapın</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {selector.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {selector.error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="E-posta adresiniz"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Şifre
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Şifreniz"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              selector.isLoading || !isFormValid
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {selector.isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Giriş yapılıyor...
              </div>
            ) : (
              'Giriş Yap'
            )}
          </button>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Hesabınız yok mu?{' '}
              <button
                type="button"
                onClick={handleRegisterClick}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Kayıt Olun
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;