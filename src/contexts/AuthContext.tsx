import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import api, {
  clearScheduledTokenRefresh,
  scheduleTokenRefresh,
} from '../services/api';
import type User from '../types/User';

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
  isAuthLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Set user and accessToken state if they exist in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
      scheduleTokenRefresh(storedToken); // ✅ planifie le refresh dès que tu retrouves un token
    }

    setIsAuthLoading(false);
  }, []);

  // Update localStorage whenever user state changes
  useEffect(() => {
    if (user && accessToken) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user, accessToken]);

  // Login function
  const login = async (email: string, password: string, remember: boolean) => {
    try {
      const response = await api.post('/login', { email, password });
      const { token, user } = response.data;

      setUser(user);
      setAccessToken(token);

      if (remember) {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(user));
      }

      scheduleTokenRefresh(token); // ✅ planifie aussi ici après login
    } catch (error) {
      setUser(null);
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
    clearScheduledTokenRefresh(); // ✅
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, isAuthLoading, setUser }}
    >
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
