import { Heart, KeyRound, MessageSquare, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import '../../pages/Profile.scss';
import { Link, useNavigate, useParams } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import type User from '../../types/User';
import type { IProposition } from '../../types/Proposition';
import Grade from '../Grade';
import Post from '../Post';
import Testimonial from '../Testimonial';
import AvailabilityEditor from '../profile/AvailabilityEditor';
import ConfirmModal from '../profile/ConfirmModal';
import IsAvailableToggle from '../profile/IsAvailableToggle';
import PasswordModal from '../profile/PasswordModal';
import ProfileHeaderEditor from '../profile/ProfileHeaderEditor';
import SkillEditor from '../profile/SkillEditor';
import SkillWantedEditor from '../profile/SkillWantedEditor';

function ProfilePage() {
  let { userId } = useParams();
  const navigate = useNavigate();
  const { user: connectedUser, logout, isAuthLoading } = useAuth();

  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(false);
  const [propositionsSent, setPropositionsSent] = useState<IProposition[]>([]);

  if (!userId && connectedUser) {
    userId = connectedUser.id.toString();
  }

  const isOwnProfile = connectedUser?.id?.toString() === userId;

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthLoading) return;

      try {
        setIsLoading(true);
        setError('');

        const [userResponse, followsResponse, reviewsResponse, postsResponse] =
          await Promise.all([
            api.get(`/users/${userId}`),
            api.get(`/users/follows/${userId}`),
            api.get(`/reviews/${userId}`),
            api.get(`/posts/${userId}`),
          ]);

        setUserData({
          ...userResponse.data.user,
          Follows: followsResponse.data.user.Follows,
          Followers: followsResponse.data.user.Followers,
          Reviews: reviewsResponse.data.reviews,
          Posts: postsResponse.data.posts,
        });

        if (!isOwnProfile && connectedUser) {
          const propRes = await api.get(`/propositions/${connectedUser.id}`);
          setPropositionsSent(propRes.data.propositions);
        }
      } catch (error) {
        setError((error as { message: string }).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, isAuthLoading, connectedUser, isOwnProfile]);

  const handleDeleteAccount = async () => {
    try {
      await api.delete('/me');
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la suppression du compte :', error);
      alert(
        `Erreur : ${
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || 'Erreur inconnue'
        }`,
      );
    }
  };

  useEffect(() => {
    if (userData) {
      setIsFollowing(
        userData.Followers.some(
          (follower) => follower.id === connectedUser?.id,
        ),
      );
    }
  }, [userData, connectedUser]);

  const handleFollowAndUnfollow = async () => {
    if (!connectedUser) return;
    try {
      if (!isFollowing) {
        await api.post(`/me/follow/${userId}`);
        setUserData((prevUserData) => {
          if (prevUserData) {
            return {
              ...prevUserData,
              Followers: [
                ...prevUserData.Followers,
                {
                  id: connectedUser.id,
                  username: connectedUser.username,
                  avatar: connectedUser.avatar,
                },
              ],
            };
          }
          return prevUserData;
        });
        setIsFollowing(true);
      } else {
        await api.delete(`/me/follow/${userId}`);
        setUserData((prevUserData) => {
          if (prevUserData) {
            return {
              ...prevUserData,
              Followers: prevUserData.Followers.filter(
                (follower) => follower.id !== connectedUser.id,
              ),
            };
          }
          return prevUserData;
        });
        setIsFollowing(false);
      }
    } catch (error) {
      console.error('Erreur lors du follow/unfollow :', error);
    }
  };

  if (isLoading) {
    return (
      <main className="container">
        <h1>Chargement...</h1>
      </main>
    );
  }

  if (error !== '' || !userData) {
    return (
      <main className="container">
        <h1>{error}</h1>
      </main>
    );
  }

  return (
    <>
      {passwordChangeMessage && (
        <div className="success-message">{passwordChangeMessage}</div>
      )}

      <main className="profile container">
        <section className="profile-header">
          <img
            className="profile-header-picture"
            src={userData.avatar}
            alt={userData.username}
          />
          <div className="profile-header-content">
            <div>
              <div className="profile-header-content-title">
                <ProfileHeaderEditor
                  value={userData.username}
                  field="username"
                  setUserData={setUserData}
                  className="editable-username"
                  type="input"
                  isOwner={isOwnProfile}
                />
                <IsAvailableToggle
                  isAvailable={userData.isAvailable}
                  setUserData={setUserData}
                  isOwner={isOwnProfile}
                />
              </div>
              <Grade
                rating={
                  userData.Reviews.reduce((acc, el) => acc + el.grade, 0) /
                  userData.Reviews.length
                }
                nbReviews={userData.Reviews.length}
              />
            </div>

            <ProfileHeaderEditor
              value={userData.description}
              field="description"
              setUserData={setUserData}
              type="textarea"
              isOwner={isOwnProfile}
            />

            <div className="profile-header-content-btns">
              {isOwnProfile ? (
                <>
                  <button
                    className="btn btn-default"
                    type="button"
                    onClick={() => setIsPasswordModalOpen(true)}
                  >
                    <KeyRound /> Changer le mot de passe
                  </button>
                  <button
                    className="btn btn-alt"
                    type="button"
                    onClick={() => setIsConfirmModalOpen(true)}
                  >
                    <Trash2 /> Supprimer mon compte
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-default"
                    type="button"
                    onClick={() => {
                      connectedUser
                        ? navigate(`/message/${userId}`)
                        : navigate('/login');
                    }}
                  >
                    <MessageSquare /> Contacter
                  </button>
                  {connectedUser && (
                    <button className="btn btn-alt btn-icon" type="button">
                      <Heart
                        onClick={handleFollowAndUnfollow}
                        color={isFollowing ? 'red' : 'black'}
                        fill={isFollowing ? 'red' : 'transparent'}
                      />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        <div className="profile-col1">
          <section className="profile-skills">
            <h2>Compétences</h2>
            <SkillEditor
              skills={userData.Skills ?? []}
              isOwner={isOwnProfile}
              setUserData={setUserData}
            />
          </section>
          <section className="profile-interest">
            <h2>Intérêts</h2>
            <SkillWantedEditor
              skills={userData.WantedSkills ?? []}
              isOwner={isOwnProfile}
              setUserData={setUserData}
            />
          </section>
          <section className="profile-fav">
            <h2>Favoris</h2>
            {userData.Follows?.length ? (
              userData.Follows.map((el) => (
                <Link to={`/profile/${el.id}`} key={el.username}>
                  <img
                    className="profile-fav-picture"
                    src={el.avatar}
                    alt={el.username}
                  />
                </Link>
              ))
            ) : (
              <p>Aucun favori renseigné</p>
            )}
          </section>
        </div>

        <div className="profile-col2">
          <AvailabilityEditor
            userData={userData}
            isOwner={isOwnProfile}
            setUserData={setUserData}
          />
          <section className="profile-posts">
            <h2>Annonces</h2>
            <div className="posts-container">
              {userData.Posts?.filter((el) => !el.isClosed).length ? (
                userData.Posts.filter((el) => !el.isClosed).map((el) => (
                  <Post
                    key={el.id}
                    data={el}
                    variant="post"
                    origin="profile"
                    setUserData={setUserData}
                    hasAlreadyProposed={propositionsSent.some(
                      (p) => p.post_id === el.id,
                    )}
                  />
                ))
              ) : (
                <p>Aucune annonce active</p>
              )}
            </div>
          </section>

          <section className="profile-testimonials">
            <h2>Avis</h2>
            <div className="testimonials">
              {userData.Reviews?.length ? (
                userData.Reviews.map((el) => (
                  <Testimonial key={el.id} data={el} />
                ))
              ) : (
                <p>Aucun avis renseigné</p>
              )}
            </div>
          </section>
        </div>

        {isPasswordModalOpen && (
          <PasswordModal
            onClose={() => setIsPasswordModalOpen(false)}
            onSuccess={(message) => {
              setPasswordChangeMessage(message);
              setIsPasswordModalOpen(false);
              setTimeout(() => setPasswordChangeMessage(''), 3000);
            }}
          />
        )}

        {isConfirmModalOpen && (
          <ConfirmModal
            message="Es-tu sûr de vouloir supprimer ton compte ? Cette action est irréversible."
            onCancel={() => setIsConfirmModalOpen(false)}
            onConfirm={handleDeleteAccount}
          />
        )}
      </main>
    </>
  );
}

export default ProfilePage;
