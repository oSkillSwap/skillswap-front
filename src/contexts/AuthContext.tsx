import type React from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import api from '../services/api';
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

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Init from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsAuthLoading(false);
  }, []);

  // Sync user and token to localStorage
  useEffect(() => {
    if (user && accessToken) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    }
  }, [user, accessToken]);

  // Login function
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
      } catch (err) {
        setUser(null);
        setAccessToken(null);
        throw err;
      }
    },
    [],
  );

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, isAuthLoading, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook
function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
