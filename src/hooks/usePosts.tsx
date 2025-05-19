import { useEffect, useState } from 'react';
import api from '../services/api';
import type { IPosts } from '../types/Posts';

export const usePosts = () => {
  const [posts, setPosts] = useState<IPosts[] | []>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data.posts);
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error('Error fetching posts:', error);
      }
    };
    getPosts();
  }, []);

  return { posts };
};
