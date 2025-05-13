import { MessageSquare, SquareX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../services/api';
import type { IEnrichedProposition } from '../../types/Proposition';
import Grade from '../Grade';
import Post from '../Post';

function ProfileOffers() {
  const [propositions, setPropositions] = useState<IEnrichedProposition[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPropositions = async () => {
      try {
        const res = await api.get('/me/propositions');
        setPropositions(res.data.propositions);
      } catch (err) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error(err);
        setError('Erreur lors du chargement.');
      }
    };

    fetchPropositions();
  }, []);

  const visiblePropositions = propositions.filter(
    (p) => p.state !== 'acceptée',
  );

  return (
    <section className="container posts-propositions">
      <h2>Mes offres</h2>
      {error && <p className="error">{error}</p>}
      <div className="posts-container">
        {visiblePropositions.length > 0 ? (
          visiblePropositions.map((prop) => (
            <Post
              key={prop.id}
              data={prop.Post}
              variant="offer"
              origin="profile"
            >
              <div className="post-author">
                <div>
                  <div className="post-author-userinfo">
                    <img
                      className="post-author-userinfo-picture"
                      src={prop.Receiver?.avatar || '/img/avatars/robot1.jpg'}
                      alt={prop.Receiver?.username}
                    />
                    <div>
                      <h3>{prop.Receiver?.username}</h3>
                      <Grade
                        rating={prop.Receiver?.averageGrade}
                        nbReviews={prop.Receiver?.nbOfReviews}
                      />
                    </div>
                  </div>
                  <p className="post-offer-date">
                    Envoyé le{' '}
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
                    onClick={() => navigate(`/message/${prop.Receiver?.id}`)}
                  >
                    <MessageSquare />
                    Contacter
                  </button>
                  <button className="btn btn-secondary" type="button">
                    <SquareX />
                    Annuler
                  </button>
                </div>
              </div>
            </Post>
          ))
        ) : (
          <p>Aucune offre pour le moment.</p>
        )}
      </div>
    </section>
  );
}

export default ProfileOffers;
