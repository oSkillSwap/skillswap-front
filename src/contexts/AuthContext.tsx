import axios from 'axios';
import type React from 'react';
import { createContext, useContext, useState } from 'react';
import { API_URL } from '../config';

type AuthContextType = {
  username: string | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    await axios
      .post(`${API_URL}/login`, { email, password })
      .then((response) => {
        setUsername(response.data.user.username);
        setAccessToken(response.data.token);
      })
      .catch((error) => {
        setUsername(null);
        setAccessToken(null);
        throw error;
      });
  };

  const logout = () => {
    setUsername(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ username, accessToken, login, logout }}>
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
