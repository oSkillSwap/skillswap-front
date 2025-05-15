import CategoryCarousel from '../components/CategoryCarousel';
import Post from '../components/Post';
import Searchbar from '../components/Searchbar';
import UserCard from '../components/UserCard';
import type { IUsers } from '../types/Users';
import './Explore.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useSearch } from '../hooks/useSearch';
import type { IPosts } from '../types/Posts';
import type { IProposition } from '../types/Proposition';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import PageTransition from '../utils/PageTransition';

function Explore() {
  const { user: connectedUser } = useAuth();
  const { searchUsers, searchPosts, handleSearch } = useSearch();
  const [searchParams] = useSearchParams();
  const [propositionsSent, setPropositionsSent] = useState<IProposition[]>([]);

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) handleSearch(search);
  }, [searchParams, handleSearch]);

  useEffect(() => {
    const fetchPropositions = async () => {
      if (!connectedUser) return;
      try {
        const res = await api.get(`/propositions/${connectedUser.id}`);
        setPropositionsSent(res.data.propositions);
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error('Erreur fetch propositions Explore :', error);
      }
    };

    fetchPropositions();
  }, [connectedUser]);

  return (
    <main className="explore container">
      <section className="content">
        <Searchbar handleSearch={handleSearch} />
      </section>

      <section className="content">
        <h1>Catégories</h1>
        <CategoryCarousel />
      </section>

      <section className="content">
        <h1>Résultats : Profils trouvés</h1>
        <div className="content-results">
          {searchUsers.map((user: IUsers) => (
            <UserCard user={user} key={user.username} />
          ))}
        </div>
      </section>

      <section className="content">
        <h1>Résultats : Annonces trouvées</h1>
        <div className="content-results">
          {searchPosts.map((post: IPosts) => {
            const hasAlreadyProposed = propositionsSent.some(
              (p) => p.post_id === post.id,
            );

            return (
              <Post
                key={post.id}
                data={post}
                variant="post"
                origin="explore"
                hasAlreadyProposed={hasAlreadyProposed}
                onPropositionSent={(postId) =>
                  setPropositionsSent((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      post_id: postId,
                      state: 'en attente',
                      createdAt: new Date().toISOString(),
                      Sender: {
                        id: connectedUser?.id ?? 0,
                        username: connectedUser?.username ?? 'moi',
                      },
                    } as IProposition,
                  ])
                }
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default PageTransition(Explore);
