import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BooksProvider } from './contexts/BooksContext';
import { ChatProvider } from './contexts/ChatContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { FriendsProvider } from './contexts/FriendsContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Library from './pages/Library';
import BookDetail from './pages/BookDetail';
import MyBooks from './pages/MyBooks';
import Upload from './pages/Upload';
import Chat from './pages/Chat';
import Friends from './pages/Friends';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to="/" replace /> : <Login />} 
      />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Library />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/my-books" element={<MyBooks />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/friends" element={<Friends />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <FriendsProvider>
            <BooksProvider>
              <ChatProvider>
                <AppRoutes />
              </ChatProvider>
            </BooksProvider>
          </FriendsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
