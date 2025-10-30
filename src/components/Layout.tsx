import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  MessageCircle, 
  Upload, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const { chats } = useChat();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalUnread = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-card sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <BookOpen className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </motion.div>
              <span className="text-xl font-bold gradient-text">Библиотека</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-semibold"
              >
                Книги
              </Link>
              <Link 
                to="/my-books" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-semibold"
              >
                Мои книги
              </Link>
              <Link 
                to="/friends" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-semibold"
              >
                Друзья
              </Link>
              <Link 
                to="/chat" 
                className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-semibold"
              >
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-5 h-5" />
                  <span>Чат</span>
                </div>
                {totalUnread > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg"
                  >
                    {totalUnread}
                  </motion.span>
                )}
              </Link>
              <Link 
                to="/upload" 
                className="btn-primary flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Загрузить</span>
              </Link>
            </nav>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-3 px-4 py-2 glass-card">
                <img
                  src={user?.avatar}
                  alt={user?.username}
                  className="w-8 h-8 rounded-full ring-2 ring-primary-500/50"
                />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{user?.username}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                title="Выйти"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-4 py-3 space-y-3">
              <Link 
                to="/" 
                className="block text-gray-700 hover:text-primary-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Книги
              </Link>
              <Link 
                to="/my-books" 
                className="block text-gray-700 hover:text-primary-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Мои книги
              </Link>
              <Link 
                to="/chat" 
                className="block text-gray-700 hover:text-primary-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Чат {totalUnread > 0 && `(${totalUnread})`}
              </Link>
              <Link 
                to="/upload" 
                className="block btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Загрузить книгу
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-600 py-2"
              >
                Выйти
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

