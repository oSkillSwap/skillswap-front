import { useEffect, useState } from 'react';
import api from '../services/api';
import type { IUsers } from '../types/Users';

export const useUsers = () => {
  const [users, setUsers] = useState<IUsers[] | []>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data.users);
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error('Error fetching users:', error);
      }
    };
    getUsers();
  }, []);

  return { users };
};
