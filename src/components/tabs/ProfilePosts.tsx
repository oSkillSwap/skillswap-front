import { MessageSquare, SquareCheckBig, SquareX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import type { IPosts } from '../../types/Posts';
import type { IProposition } from '../../types/Proposition';
import Grade from '../Grade';
import Post from '../Post';

function ProfilePosts() {
  const { user: connectedUser } = useAuth();
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [propositions, setPropositions] = useState<IProposition[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, propositionsRes] = await Promise.all([
          api.get('/me/posts'),
          api.get(`/propositions/${connectedUser?.id}`),
        ]);

        setPosts(postsRes.data.posts);
        setPropositions(propositionsRes.data.propositions);
      } catch (err) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error(err);
        setError('Erreur lors du chargement.');
      }
    };
    //comment

    if (connectedUser?.id) {
      fetchData();
    }
  }, [connectedUser?.id]);

  const groupedPropositions = propositions.reduce<
    Record<number, IProposition[]>
  >((acc, prop) => {
    if (!acc[prop.post_id]) acc[prop.post_id] = [];
    acc[prop.post_id].push(prop);
    return acc;
  }, {});

  const handleAccept = async (propositionId: number) => {
    try {
      await api.patch(`/propositions/${propositionId}/accept`);
      const { data } = await api.get(`/propositions/${connectedUser?.id}`);
      setPropositions(data.propositions);
      window.dispatchEvent(new Event('exchange-updated'));
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error("Erreur lors de l'acceptation :", err);
    }
  };

  const handleCancel = async () => {
    alert("Fonction d'annulation à implémenter.");
  };

  const visiblePosts = posts.filter((post) => {
    const props = groupedPropositions[post.id!] ?? [];
    return !props.some((p) => p.state === 'acceptée');
  });

  return (
    <section className="container posts-propositions">
      <h2>Mes annonces</h2>
      {error && <p className="error">{error}</p>}
      <div className="posts-container">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post) => {
            const postPropositions = (
              groupedPropositions[post.id!] ?? []
            ).filter((p) => p.state !== 'acceptée');

            return (
              <Post
                key={`post-${post.id}`}
                data={post}
                variant="post"
                origin="profile"
                author={true}
                setPosts={setPosts}
              >
                {postPropositions.length > 0 ? (
                  postPropositions.map((prop) => (
                    <div key={`prop-${prop.id}`} className="post-author">
                      <div>
                        <div className="post-author-userinfo">
                          <img
                            className="post-author-userinfo-picture"
                            src={
                              prop.Sender?.avatar || '/img/avatars/robot1.jpg'
                            }
                            alt={prop.Sender?.username}
                          />
                          <div>
                            <h3>{prop.Sender?.username}</h3>
                            <Grade rating={4} nbReviews={3} />
                          </div>
                        </div>
                        <p className="post-offer-date">
                          Proposition reçue le{' '}
                          {new Date(prop.createdAt ?? '').toLocaleDateString(
                            'fr-FR',
                            {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            },
                          )}
                        </p>
                        <p className="post-offer-content">{prop.content}</p>
                        <p className="post-offer-state">État : {prop.state}</p>
                      </div>

                      <div className="post-author-btns">
                        <button
                          className="btn btn-reversed"
                          type="button"
                          onClick={() =>
                            navigate(`/message/${prop.Sender?.id}`)
                          }
                        >
                          <MessageSquare />
                          Contacter
                        </button>
                        {prop.state === 'en attente' && (
                          <button
                            className="btn btn-default"
                            type="button"
                            onClick={() => handleAccept(prop.id!)}
                          >
                            <SquareCheckBig />
                            Accepter
                          </button>
                        )}
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={handleCancel}
                        >
                          <SquareX />
                          Annuler
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-propositions"> </p>
                )}
              </Post>
            );
          })
        ) : (
          <p className="no-data">Aucune annonce pour le moment</p>
        )}
      </div>
    </section>
  );
}

export default ProfilePosts;
