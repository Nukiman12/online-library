import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
      navigate('/');
    } catch (err) {
      setError('Произошла ошибка. Попробуйте снова.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-purple-600 to-pink-500 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 flex items-center justify-center px-4 animate-gradient relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      <div className="max-w-md w-full relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="glass-card p-6 rounded-3xl">
              <BookOpen className="w-16 h-16 text-white animate-float" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">📚 Онлайн Библиотека</h1>
          <p className="text-white/90 text-lg">Делитесь знаниями с друзьями</p>
        </div>

        {/* Login Form */}
        <div className="glass-card p-8 backdrop-blur-2xl">
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 font-bold transition-all ${
                  isLogin
                    ? 'gradient-text border-b-2 border-primary-600 dark:border-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Вход
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 font-bold transition-all ${
                  !isLogin
                    ? 'gradient-text border-b-2 border-primary-600 dark:border-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Регистрация
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Имя пользователя
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field pl-10"
                    placeholder="Введите имя"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
                {error}
              </div>
            )}

            <button type="submit" className="w-full btn-primary py-4 text-lg">
              {isLogin ? '🚀 Войти' : '✨ Зарегистрироваться'}
            </button>
          </form>

          {isLogin && (
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold">
                Забыли пароль?
              </a>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-white/80 text-sm">
          © 2025 Онлайн Библиотека. Все права защищены.
        </div>
      </div>
    </div>
  );
};

export default Login;

