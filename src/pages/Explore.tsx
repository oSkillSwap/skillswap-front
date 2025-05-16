import Post from '../components/Post';
import Searchbar from '../components/Searchbar';
import UserCard from '../components/UserCard';
import type { IUsers } from '../types/Users';
import './Explore.scss';
import { FileSearch, UserSearch } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useSearch } from '../hooks/useSearch';
import api from '../services/api';
import type { IPosts } from '../types/Posts';
import type { IProposition } from '../types/Proposition';
import PageTransition from '../utils/PageTransition';

function Explore() {
  const { user: connectedUser } = useAuth();
  const { searchUsers, searchPosts, handleSearch } = useSearch();
  const [searchOpt, setSearchOpt] = useState('post');
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
        <h1 className="pour-le-lore">
          <span>G</span>
          <span>O</span>
          <span>O</span>
          <span>G</span>
          <span>L</span>
          <span>E</span>
          <span>S</span>
          <span>W</span>
          <span>A</span>
          <span>P</span>
        </h1>

        <Searchbar handleSearch={handleSearch} />

        <div className="explore-btns">
          <button
            className={`btn ${searchOpt === 'post' ? 'btn-default' : 'btn-alt'}`}
            type="button"
            onClick={() => setSearchOpt('post')}
          >
            <FileSearch />
            Annonces
          </button>
          <button
            className={`btn ${searchOpt === 'user' ? 'btn-default' : 'btn-alt'}`}
            type="button"
            onClick={() => setSearchOpt('user')}
          >
            <UserSearch />
            Profils
          </button>
        </div>

        <div className="content-results">
          {searchOpt === 'user'
            ? searchUsers.map((user: IUsers) => {
                return <UserCard user={user} key={user.username} />;
              })
            : searchPosts.map((post: IPosts) => {
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
