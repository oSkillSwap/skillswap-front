import { Heart, MessageSquare } from 'lucide-react';
import './UserCard.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import type { ISkills } from '../types/Skills';
import type User from '../types/User';
import type { IUsers } from '../types/Users';
import Grade from './Grade';

function UserCard({ user }: { user: IUsers }) {
  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(false);
  const { user: connectedUser } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!connectedUser) {
        setUserData(null);
        setIsFollowing(false);
        return;
      }
      try {
        const userResponse = await api.get('/me/users');
        const followsResponse = await api.get('/me/follows');
        setUserData({
          ...userResponse.data,
          Follows: followsResponse.data.user.Follows,
        });
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error(
          'Erreur lors de la récupération des données utilisateur :',
          error,
        );
      }
    };
    fetchUserData();
  }, [connectedUser]);

  useEffect(() => {
    if (!userData) return;
    // Vérifie si l'utilisateur connecté suit déjà le profil
    const isFollowing = userData.Follows.some(
      (follow) => follow.id === user.id,
    );
    setIsFollowing(isFollowing);
  }, [userData, user.id]);

  // Permet de suivre un utilisateur
  const followUser = async () => {
    if (!connectedUser) return;
    try {
      await api.post(`/me/follow/${user.id}`);
      // Met à jour localement l'état de l'utilisateur
      // en ajoutant l'utilisateur dans la liste des Follows
      setUserData((prevUserData) => {
        // Si les données précédentes existent
        if (prevUserData) {
          return {
            ...prevUserData, // Copie toutes les propriétés existantes

            // On ajoute l'utilisateur connecté dans la liste des Follows
            Follows: [
              ...prevUserData.Follows, // On garde les anciens follows
              // On ajoute l'utilisateur
              {
                id: user.id,
                username: user.username,
                avatar: user.avatar,
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
      await api.delete(`/me/follow/${user.id}`);
      // Met à jour localement l'état de l'utilisateur
      // en supprimant l'utilisateur connecté de la liste des Follows
      setUserData((prevUserData) => {
        // Si les données précédentes existent
        if (prevUserData) {
          return {
            ...prevUserData, // On garde toutes les autres données inchangées

            // On retire l'utilisateur connecté de la liste des Follows
            Follows: prevUserData.Follows.filter(
              (follow) => follow.id !== user.id, // Supprime uniquement si l'id correspond
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

  return (
    <article className="profile-card">
      <Link
        to={
          connectedUser
            ? user.id !== connectedUser?.id
              ? `/profile/${user.id}`
              : '/profile'
            : `/profile/${user.id}`
        }
        className="profile-card-link"
      >
        <img className="profile-card-picture" src={user.avatar} alt="" />
      </Link>
      <div className="profile-card-content-wrapper">
        <div>
          <h3 className="profile-card-username">{user.username}</h3>
          <Grade rating={user.averageGrade} nbReviews={user.nbOfReviews} />
        </div>
        <p className="profile-card-bio">{user.description}</p>

        <div className="profile-card-skills">
          <p className="profile-card-skills-title">Mes compétences :</p>
          <div className="profile-card-skills-tags">
            {user.Skills.map((skill: ISkills) => {
              return (
                <p className="tag" key={skill.name}>
                  {skill.name}
                </p>
              );
            })}
          </div>
        </div>
        <div className="profile-card-interests">
          <p className="profile-card-interests-title">
            Je suis interessé par :
          </p>
          <div className="profile-card-interests-tags">
            {user.WantedSkills.map((skill: ISkills) => {
              return (
                <p className="tag" key={skill.name}>
                  {skill.name}
                </p>
              );
            })}
          </div>
        </div>
        <div className="profile-card-btns">
          {user.id !== connectedUser?.id && (
            <>
              <Link
                className="btn btn-default"
                to={connectedUser ? `/message/${user.id}` : '/login'}
              >
                <MessageSquare />
                Contacter
              </Link>
              {connectedUser && (
                <button
                  className="btn btn-alt btn-icon"
                  type="button"
                  onClick={handleFollowAndUnfollow}
                >
                  <Heart
                    color={isFollowing ? 'red' : 'black'}
                    fill={isFollowing ? 'red' : 'transparent'}
                  />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default UserCard;
