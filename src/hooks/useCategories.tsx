import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config";
import type { ICategories } from "../types/Categories";

export const useCategories = () => {
  const [categories, setCategories] = useState<ICategories[] | []>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data.categories);
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error("Error fetching users:", error);
      }
    };
    getCategories();
  }, []);

  return { categories };
};
