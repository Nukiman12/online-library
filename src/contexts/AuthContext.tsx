import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: '1',
        username: 'DemoUser',
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${email}&background=0ea5e9&color=fff`,
        created_at: new Date().toISOString(),
        friends: ['2', '4'],
        friend_requests: ['3'],
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, _password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: Date.now().toString(),
        username,
        email,
        avatar: `https://ui-avatars.com/api/?name=${username}&background=0ea5e9&color=fff`,
        created_at: new Date().toISOString(),
        friends: [],
        friend_requests: [],
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

