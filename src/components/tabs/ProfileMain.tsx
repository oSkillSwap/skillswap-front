import { Heart, KeyRound, MessageSquare, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import '../../pages/Profile.scss';
import { Link, useNavigate, useParams } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import type User from '../../types/User';
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

function Profile() {
  let { user: profileId } = useParams();
  const navigate = useNavigate();
  const { user: connectedUser, logout } = useAuth();

  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(false);

  if (!profileId && connectedUser) {
    profileId = connectedUser.id.toString();
  }

  const isOwnProfile = connectedUser?.id?.toString() === profileId;
  useEffect(() => {
    setIsLoading(true);
    setError('');

    Promise.all([
      api.get(`/users/${profileId}`),
      api.get(`/users/follows/${profileId}`),
      api.get(`/reviews/${profileId}`),
      api.get(`/posts/${profileId}`),
    ])
      .then(
        ([userResponse, followsResponse, reviewsResponse, postsResponse]) => {
          setUserData({
            ...userResponse.data.user,
            Follows: followsResponse.data.user.Follows,
            Followers: followsResponse.data.user.Followers,
            Reviews: reviewsResponse.data.reviews,
            Posts: postsResponse.data.posts,
          });
          setIsLoading(false);
        },
      )
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [profileId]);

  const handleDeleteAccount = async () => {
    try {
      await api.delete('/me');
      logout();
      navigate('/login');
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
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

  // Permet de suivre un utilisateur
  const followUser = async () => {
    if (!connectedUser) return;
    try {
      await api.post(`/me/follow/${profileId}`);
      // Met à jour localement l'état de l'utilisateur
      // en ajoutant l'utilisateur connecté dans la liste des Followers
      setUserData((prevUserData) => {
        // Si les données précédentes existent
        if (prevUserData) {
          return {
            ...prevUserData, // Copie toutes les propriétés existantes

            // On ajoute l'utilisateur connecté dans la liste des Followers
            Followers: [
              ...prevUserData.Followers, // On garde les anciens followers
              // On ajoute l'utilisateur connecté
              {
                id: connectedUser.id,
                username: connectedUser.username,
                avatar: connectedUser.avatar,
              },
            ],
          };
        }
        // Si `prevUserData` est null, on ne fait rien
        return prevUserData;
      });
      // Met à jour l'état isFollowing
      setIsFollowing(true);
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Erreur lors du follow :', error);
    }
  };

  // Permet de ne plus suivre un utilisateur
  const unfollowUser = async () => {
    // Vérifie si l'utilisateur est connecté
    if (!connectedUser) return;
    try {
      await api.delete(`/me/follow/${profileId}`);
      // Met à jour localement l'état de l'utilisateur
      // en supprimant l'utilisateur connecté de la liste des Followers
      setUserData((prevUserData) => {
        // Si les données précédentes existent
        if (prevUserData) {
          return {
            ...prevUserData, // On garde toutes les autres données inchangées

            // On retire l'utilisateur connecté de la liste des Followers
            Followers: prevUserData.Followers.filter(
              (follower) => follower.id !== connectedUser.id, // Supprime uniquement si l'id correspond
            ),
          };
        }
        // Si `prevUserData` est null, on retourne tel quel
        return prevUserData;
      });
      // Met à jour localement l'était isFollowing
      setIsFollowing(false);
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Erreur lors du unfollow :', error);
    }
  };

  const handleFollowAndUnfollow = async () => {
    if (!connectedUser) return;
    try {
      // Vérifie si l'utilisateur suit déjà le profil
      if (!isFollowing) {
        // Si l'utilisateur ne suit pas, on le suit
        return await followUser();
      }
      // Si l'utilisateur suit déjà, on arrête de le suivre
      await unfollowUser();
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Erreur lors du follow :', error);
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
                  <Link
                    className="btn btn-default"
                    to={`/message/${profileId}`}
                  >
                    <MessageSquare /> Contacter
                  </Link>
                  <button className="btn btn-alt btn-icon" type="button">
                    <Heart
                      onClick={handleFollowAndUnfollow}
                      color={isFollowing ? 'red' : 'black'}
                      fill={isFollowing ? 'red' : 'transparent'}
                    />
                  </button>
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
              {userData.Posts?.length ? (
                userData.Posts.map((el) => (
                  <Post
                    key={el.id}
                    data={el}
                    variant="post"
                    origin="profile"
                    setUserData={setUserData}
                  />
                ))
              ) : (
                <p>Aucune annonce renseignée</p>
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

export default Profile;
