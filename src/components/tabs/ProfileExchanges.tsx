import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import Post from '../Post';
import Grade from '../Grade';
import ReviewModal from './ReviewModal';
import { MessageSquare, SquareX, SquareCheckBig, Star } from 'lucide-react';
import type { IEnrichedProposition } from '../../types/Proposition';
import './ProfileExchange.scss';

function ProfileExchanges() {
  const { user: connectedUser } = useAuth();
  const [ongoingExchanges, setOngoingExchanges] = useState<
    IEnrichedProposition[]
  >([]);
  const [finishedExchanges, setFinishedExchanges] = useState<
    IEnrichedProposition[]
  >([]);
  const [error, setError] = useState('');
  const [activeReviewProp, setActiveReviewProp] =
    useState<IEnrichedProposition | null>(null);
  const [reviewedIds, setReviewedIds] = useState<number[]>([]);
  const navigate = useNavigate();
  const LOCAL_KEY = 'finishedPropositions';
  const REVIEWED_KEY = 'reviewedPropositions';

  function hasGrades(
    user: any,
  ): user is { averageGrade: number; nbOfReviews: number } {
    return 'averageGrade' in user && 'nbOfReviews' in user;
  }

  useEffect(() => {
    const fetchAcceptedPropositions = async () => {
      try {
        const res = await api.get('/me/all-propositions');
        const accepted: IEnrichedProposition[] = res.data.propositions.filter(
          (p: IEnrichedProposition) => p.state === 'acceptée',
        );

        const finishedIds: number[] = JSON.parse(
          localStorage.getItem(LOCAL_KEY) || '[]',
        );
        const reviewed: number[] = JSON.parse(
          localStorage.getItem(REVIEWED_KEY) || '[]',
        );

        setReviewedIds(reviewed);
        setOngoingExchanges(
          accepted.filter((p) => !finishedIds.includes(p.id!)),
        );
        setFinishedExchanges(
          accepted.filter((p) => finishedIds.includes(p.id!)),
        );
      } catch (err) {
        console.error(err);
        setError('Erreur lors du chargement des échanges.');
      }
    };

    fetchAcceptedPropositions();
  }, []);

  const handleFinish = (prop: IEnrichedProposition) => {
    const updatedFinishedIds = JSON.parse(
      localStorage.getItem(LOCAL_KEY) || '[]',
    );
    updatedFinishedIds.push(prop.id);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedFinishedIds));

    setOngoingExchanges((prev) => prev.filter((p) => p.id !== prop.id));
    setFinishedExchanges((prev) => [...prev, prop]);
  };

  const handleReviewSubmit = async (grade: number, comment: string) => {
    if (!activeReviewProp) return;

    try {
      await api.post('/me/reviews', {
        grade,
        comment,
        postId: activeReviewProp.Post.id,
        propositionId: activeReviewProp.id,
      });

      const reviewed = JSON.parse(localStorage.getItem(REVIEWED_KEY) || '[]');
      reviewed.push(activeReviewProp.id);
      localStorage.setItem(REVIEWED_KEY, JSON.stringify(reviewed));
      setReviewedIds(reviewed);

      setActiveReviewProp(null);
      alert('Avis envoyé !');
    } catch (err) {
      console.error("Erreur lors de l'envoi de l'avis", err);
      alert("Une erreur s'est produite lors de l'envoi de l'avis.");
    }
  };

  const buildOtherUser = (prop: IEnrichedProposition) => {
    const rawUser =
      prop.Sender?.id === connectedUser?.id ? prop.Receiver : prop.Sender;
    return {
      id: rawUser?.id ?? 0,
      username: rawUser?.username ?? 'Utilisateur inconnu',
      avatar: rawUser?.avatar ?? '/img/avatars/robot1.jpg',
      averageGrade: hasGrades(rawUser) ? rawUser.averageGrade : 0,
      nbOfReviews: hasGrades(rawUser) ? rawUser.nbOfReviews : 0,
    };
  };

  return (
    <section className="container posts-propositions">
      <h2 className="tabs-subtitle">Mes échanges en cours</h2>
      {error && <p className="error">{error}</p>}
      <div className="posts-container">
        {ongoingExchanges.length > 0 ? (
          ongoingExchanges.map((prop) => {
            const otherUser = buildOtherUser(prop);
            return (
              <Post
                key={prop.id}
                data={{
                  ...prop.Post,
                  Author: otherUser,
                }}
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
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => handleFinish(prop)}
                    >
                      <SquareCheckBig /> Terminer
                    </button>
                    <button className="btn btn-secondary" type="button">
                      <SquareX /> Annuler
                    </button>
                  </div>
                </div>
              </Post>
            );
          })
        ) : (
          <p>Aucun échange en cours.</p>
        )}
      </div>

      <h2 className="tabs-subtitle">Mes échanges terminés</h2>
      <div className="posts-container">
        {finishedExchanges.length > 0 ? (
          finishedExchanges.map((prop) => {
            const otherUser = buildOtherUser(prop);
            return (
              <Post
                key={prop.id}
                data={{
                  ...prop.Post,
                  Author: otherUser,
                }}
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
                        <Grade
                          rating={otherUser.averageGrade}
                          nbReviews={otherUser.nbOfReviews}
                        />
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
                    {connectedUser?.id === prop.Post.user_id ? (
                      reviewedIds.includes(prop.id!) ? (
                        <button
                          type="button"
                          className="btn btn-secondary"
                          disabled
                        >
                          Avis envoyé
                        </button>
                      ) : (
                        <button
                          className="btn btn-default"
                          type="button"
                          onClick={() => setActiveReviewProp(prop)}
                        >
                          <Star /> Donner un avis
                        </button>
                      )
                    ) : reviewedIds.includes(prop.id!) ? (
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={() =>
                          alert("Fonction Voir l'avis à implémenter")
                        }
                      >
                        <Star /> Voir l'avis
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        disabled
                      >
                        En attente de l'avis
                      </button>
                    )}
                  </div>
                </div>
              </Post>
            );
          })
        ) : (
          <p>Aucun échange terminé.</p>
        )}
      </div>

      {activeReviewProp && (
        <ReviewModal
          proposition={activeReviewProp}
          onClose={() => setActiveReviewProp(null)}
          onSuccess={handleReviewSubmit}
        />
      )}
    </section>
  );
}

export default ProfileExchanges;
