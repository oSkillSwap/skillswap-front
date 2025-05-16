import type React from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
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
  updateToken: (newToken: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Pour permettre l'appel externe de updateToken
let externalUpdateToken: (token: string) => void = () => {};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Init depuis localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
      scheduleTokenRefresh(storedToken); // Refresh auto
    }

    setIsAuthLoading(false);
  }, []);

  // Sync user et token vers localStorage
  useEffect(() => {
    if (user && accessToken) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    }
  }, [user, accessToken]);

  // Login
  const login = useCallback(
    async (email: string, password: string, remember: boolean) => {
      try {
        const response = await api.post('/login', { email, password });
        const { token, user } = response.data;

        setUser(user);
        setAccessToken(token);

        if (remember) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('accessToken', token);
        }

        scheduleTokenRefresh(token); // auto refresh planner
      } catch (err) {
        setUser(null);
        setAccessToken(null);
        throw err;
      }
    },
    [],
  );

  // Refresh accessToken
  const updateToken = (newToken: string) => {
    setAccessToken(newToken);
  };

  externalUpdateToken = updateToken;

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    clearScheduledTokenRefresh(); // delete auto refresh
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        isAuthLoading,
        setUser,
        updateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook standard
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// External access to updateToken
export const getExternalUpdateToken = () => externalUpdateToken;
