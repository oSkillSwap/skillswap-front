import { MessageSquare, SquareCheckBig, SquareX, Star } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import type { IEnrichedProposition } from '../../types/Proposition';
import type { UserWithReviewData } from '../../types/UserWithReviewData';
import Grade from '../Grade';
import Post from '../Post';
import ReviewModal from './ReviewModal';
import ReviewingModal from './ReviewingModal';

function ProfileExchanges() {
  const { user: connectedUser } = useAuth();
  const [exchanges, setExchanges] = useState<IEnrichedProposition[]>([]);
  const [activeReviewProp, setActiveReviewProp] =
    useState<IEnrichedProposition | null>(null);
  const [activeReviewView, setActiveReviewView] = useState<{
    grade: number;
    comment: string;
    title: string;
  } | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchExchanges = useCallback(async () => {
    try {
      const res = await api.get('/me/all-propositions');
      setExchanges(res.data.propositions);
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(err);
      setError('Une erreur est survenue');
    }
  }, []);

  useEffect(() => {
    fetchExchanges();
    const handleUpdate = () => fetchExchanges();
    window.addEventListener('exchange-updated', handleUpdate);
    return () => window.removeEventListener('exchange-updated', handleUpdate);
  }, [fetchExchanges]);

  const handleFinish = async (prop: IEnrichedProposition) => {
    try {
      await api.patch(`/propositions/${prop.id}/finish`);
      window.dispatchEvent(new Event('exchange-updated'));
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Erreur lors de la finalisation de l’échange', err);
      alert('Une erreur est survenue');
    }
  };

  const handleReviewSubmit = async (grade: number, comment: string) => {
    if (!activeReviewProp) return;
    try {
      await api.post('/me/reviews', {
        grade,
        comment,
        postId: activeReviewProp.Post.id,
        propositionId: activeReviewProp.id,
        title: `Avis pour ${buildOtherUser(activeReviewProp).username}`,
      });
      setActiveReviewProp(null);
      await fetchExchanges();
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error("Erreur lors de l'envoi de l'avis", err);
      alert("Une erreur s'est produite lors de l'envoi de l'avis.");
    }
  };

  const buildOtherUser = (prop: IEnrichedProposition) => {
    const rawUser = (
      prop.Sender?.id === connectedUser?.id ? prop.Receiver : prop.Sender
    ) as UserWithReviewData;

    return {
      id: rawUser?.id ?? 0,
      username: rawUser?.username ?? 'Utilisateur inconnu',
      avatar: rawUser?.avatar ?? '/img/avatars/robot1.jpg',
      averageGrade: rawUser?.averageGrade ?? 0,
      nbOfReviews: rawUser?.nbOfReviews ?? 0,
    };
  };

  const ongoing = exchanges.filter(
    (p) =>
      p.state === 'acceptée' &&
      !(p.isFinishedBySender && p.isFinishedByReceiver),
  );
  const finished = exchanges.filter(
    (p) =>
      p.state === 'acceptée' && p.isFinishedBySender && p.isFinishedByReceiver,
  );

  return (
    <section className="container posts-propositions">
      <h2 className="tabs-subtitle">Mes échanges en cours</h2>
      {error && <p className="error">{error}</p>}
      <div className="posts-container">
        {ongoing.length > 0 ? (
          ongoing.map((prop) => {
            const otherUser = buildOtherUser(prop);
            return (
              <Post
                key={prop.id}
                data={{ ...prop.Post, Author: otherUser }}
                variant="trade"
                origin="profile"
              >
                <div className="post-author">
                  <div>
                    <div className="post-author-userinfo">
                      <img
                        className="post-author-userinfo-picture"
                        src={otherUser.avatar}
                        alt={otherUser.username}
                      />
                      <div>
                        <h3>{otherUser.username}</h3>
                        <Grade
                          rating={otherUser.averageGrade}
                          nbReviews={otherUser.nbOfReviews}
                        />
                      </div>
                    </div>
                    <p className="post-offer-date">
                      Acceptée le{' '}
                      {new Date(prop.updatedAt ?? '').toLocaleDateString(
                        'fr-FR',
                      )}
                    </p>
                    <p className="post-offer-content">{prop.content}</p>
                  </div>
                  <div className="post-author-btns">
                    <button
                      className="btn btn-reversed"
                      type="button"
                      onClick={() => navigate(`/message/${otherUser.id}`)}
                    >
                      <MessageSquare /> Contacter
                    </button>
                    {(connectedUser?.id === prop.sender_id &&
                      !prop.isFinishedBySender) ||
                    (connectedUser?.id === prop.receiver_id &&
                      !prop.isFinishedByReceiver) ? (
                      <>
                        <button
                          className="btn btn-default"
                          type="button"
                          onClick={() => handleFinish(prop)}
                        >
                          <SquareCheckBig /> Terminer
                        </button>
                        <button
                          className="btn btn-secondary btn-disable"
                          type="button"
                        >
                          <SquareX /> Annuler
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-secondary"
                        type="button"
                        disabled
                      >
                        En attente de l'autre utilisateur
                      </button>
                    )}
                  </div>
                </div>
              </Post>
            );
          })
        ) : (
          <p className="no-data">Aucun échange en cours</p>
        )}
      </div>

      <h2 className="tabs-subtitle">Mes échanges terminés</h2>
      <div className="posts-container">
        {finished.length > 0 ? (
          finished.map((prop) => {
            const otherUser = buildOtherUser(prop);
            const isOwner = connectedUser?.id === prop.Post.user_id;
            const isReviewAuthor =
              prop.Review?.Reviewer?.id === connectedUser?.id;
            const isReviewTarget =
              prop.Review?.reviewed_id === connectedUser?.id;

            return (
              <Post
                key={prop.id}
                data={{ ...prop.Post, Author: otherUser }}
                variant="trade"
                origin="profile"
                isFinished
              >
                <div className="post-author">
                  <div>
                    <div className="post-author-userinfo">
                      <img
                        className="post-author-userinfo-picture"
                        src={otherUser.avatar}
                        alt={otherUser.username}
                      />
                      <div>
                        <h3>{otherUser.username}</h3>
                        <Link
                          className="exchanges-link-reviews"
                          to={`/profile/${otherUser.id}#reviews`}
                        >
                          <Grade
                            rating={otherUser.averageGrade}
                            nbReviews={otherUser.nbOfReviews}
                          />
                        </Link>
                      </div>
                    </div>
                    <p className="post-offer-date">
                      Terminé le{' '}
                      {new Date(prop.updatedAt ?? '').toLocaleDateString(
                        'fr-FR',
                      )}
                    </p>
                    <p className="post-offer-content">{prop.content}</p>
                  </div>

                  <div className="post-author-btns">
                    {isReviewAuthor ? (
                      <button
                        type="button"
                        className="btn btn-default disable"
                        disabled
                      >
                        Avis envoyé
                      </button>
                    ) : isReviewTarget && prop.Review ? (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() =>
                          setActiveReviewView({
                            grade: prop.Review.grade,
                            comment: prop.Review.content,
                            title: prop.Review.title,
                          })
                        }
                      >
                        Avis laissé par{' '}
                        {prop.Review?.Reviewer?.username || 'utilisateur'}
                      </button>
                    ) : isOwner ? (
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={() => setActiveReviewProp(prop)}
                      >
                        <Star /> Donner un avis
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        disabled
                      >
                        En attente de l’avis
                      </button>
                    )}
                  </div>
                </div>
              </Post>
            );
          })
        ) : (
          <p className="no-data">Aucun échange terminé</p>
        )}
      </div>

      {activeReviewProp && (
        <ReviewModal
          proposition={activeReviewProp}
          onClose={() => setActiveReviewProp(null)}
          onSuccess={handleReviewSubmit}
        />
      )}

      {activeReviewView && (
        <ReviewingModal
          grade={activeReviewView.grade}
          comment={activeReviewView.comment}
          onClose={() => setActiveReviewView(null)}
        />
      )}
    </section>
  );
}

export default ProfileExchanges;
