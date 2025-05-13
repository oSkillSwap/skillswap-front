import { useEffect, useState } from 'react';
import api from '../services/api';
import type { ICategories } from '../types/Categories';

export const useCategories = () => {
  const [categories, setCategories] = useState<ICategories[] | []>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data.categories);
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error('Error fetching categories:', error);
      }
    };
    getCategories();
  }, []);

  return { categories };
};
