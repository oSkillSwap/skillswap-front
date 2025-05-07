import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config";
import type { IPosts } from "../types/Posts";

export const usePosts = () => {
  const [posts, setPosts] = useState<IPosts[] | []>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts`);
        setPosts(response.data.posts);
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error("Error fetching posts:", error);
      }
    };
    getPosts();
  }, []);

  return { posts };
};
