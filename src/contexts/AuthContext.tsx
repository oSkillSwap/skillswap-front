import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import type User from '../types/User';

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Set user and accessToken state if they exist in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      // storedUser is a stringified object and needs to be parsed before set to state
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = async (email: string, password: string, remember: boolean) => {
    try {
      const response = await api.post('/login', { email, password });
      const { token, user } = response.data;

      setUser(user);
      setAccessToken(token);

      // If user checked remember me we store token and user object into localStorage
      if (remember) {
        localStorage.setItem('accessToken', token);
        // To store a js object in the localStorage it needs to be stringified
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      setUser(null); // We clear both states if error
      setAccessToken(null);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setAccessToken(null);
    localStorage.removeItem('accessToken');
  };

  // <AuthProvider> ... </AuthProvider>
  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
