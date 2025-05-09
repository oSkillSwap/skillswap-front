import { Heart, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import './Profile.scss';
import api from '../services/api';
import { Link, useParams } from 'react-router';
import Post from '../components/Post';
import Grade from '../components/Grade';
import Testimonial from '../components/Testimonial';
import type User from '../types/User';
import { useAuth } from '../contexts/AuthContext';
import AvailabilityEditor from '../components/profile/AvailabilityEditor';
import ProfileHeaderEditor from '../components/profile/ProfileHeaderEditor';
import IsAvailableToggle from '../components/profile/IsAvailableToggle';
import SkillEditor from '../components/profile/SkillEditor';
import SkillWantedEditor from '../components/profile/SkillWantedEditor';

function Profile() {
  let { user: profileId } = useParams();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user: connectedUser } = useAuth();

  if (!profileId && connectedUser) {
    profileId = connectedUser.id.toString();
  }

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

  const isOwnProfile = connectedUser?.id?.toString() === profileId;

  return (
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
            <button className="btn btn-default" type="button">
              <MessageSquare />
              Contacter
            </button>
            <button className="btn btn-alt btn-icon" type="button">
              <Heart />
            </button>
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
        {/* Availabilities => AvailabilityEditor Component */}
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
                <Post key={el.id} data={el} variant="post" origin="profile" />
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
    </main>
  );
}

export default Profile;
