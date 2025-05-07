import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config";
import type { IUsers } from "../types/Users";

export const useUsers = () => {
  const [users, setUsers] = useState<IUsers[] | []>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`);
        setUsers(response.data.users);
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  return { users };
};
