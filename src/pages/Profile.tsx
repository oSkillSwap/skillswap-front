import { Heart, MessageSquare, Pencil } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import './Profile.scss';
import api from '../services/api';
import { Link, useParams } from 'react-router';
import Grade from '../components/Grade';
import Post from '../components/Post';
import Testimonial from '../components/Testimonial';
import type User from '../types/User';
import InlineEdit from '../components/InlineEdit';
import { useAuth } from '../contexts/AuthContext';
import AvailabilityEditor from '../components/AvailabilityEditor';

interface IAvailabilityMatrix {
  [key: string]: {
    [key: string]: boolean;
  };
}

function Profile() {
  let { user } = useParams();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditingAvailabilities, setIsEditingAvailabilities] = useState(false);
  const { user: connectedUser } = useAuth();

  if (user === undefined) user = '1';

  useEffect(() => {
    setIsLoading(true);
    setError('');

    Promise.all([
      api.get(`/users/${user}`),
      api.get(`/users/follows/${user}`),
      api.get(`/reviews/${user}`),
      api.get(`/posts/${user}`),
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
  }, [user]);

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

  const availabilityMatrix: IAvailabilityMatrix = {
    Lundi: { matin: false, midi: false, 'après-midi': false, soir: false },
    Mardi: { matin: false, midi: false, 'après-midi': false, soir: false },
    Mercredi: { matin: false, midi: false, 'après-midi': false, soir: false },
    Jeudi: { matin: false, midi: false, 'après-midi': false, soir: false },
    Vendredi: { matin: false, midi: false, 'après-midi': false, soir: false },
    Samedi: { matin: false, midi: false, 'après-midi': false, soir: false },
    Dimanche: { matin: false, midi: false, 'après-midi': false, soir: false },
  };

  if (userData.Availabilities) {
    for (const availability of userData.Availabilities) {
      availabilityMatrix[availability.day_of_the_week][availability.time_slot] =
        true;
    }
  }

  const isOwnProfile = connectedUser?.id?.toString() === user;

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
              {isOwnProfile ? (
                <InlineEdit
                  value={userData.username}
                  onSave={async (newUsername) => {
                    const res = await api.patch('/me', {
                      username: newUsername,
                    });
                    setUserData((prev) =>
                      prev
                        ? { ...prev, username: res.data.user.username }
                        : prev,
                    );
                  }}
                  className="editable-username"
                />
              ) : (
                <h1 className="inline-edit-value">{userData.username}</h1>
              )}

              {userData.isAvailable ? (
                <p className="tag tag-primary">Disponible</p>
              ) : (
                <p className="tag tag-alt">Indisponible</p>
              )}
            </div>

            <Grade
              rating={
                userData.Reviews.reduce((acc, el) => acc + el.grade, 0) /
                userData.Reviews.length
              }
              nbReviews={userData.Reviews.length}
            />
          </div>
          {isOwnProfile ? (
            <InlineEdit
              value={userData.description}
              onSave={async (newDesc) => {
                const res = await api.patch('/me', { description: newDesc });
                setUserData((prev) =>
                  prev
                    ? { ...prev, description: res.data.user.description }
                    : prev,
                );
              }}
              type="textarea"
            />
          ) : (
            <p className="inline-edit-value">{userData.description}</p>
          )}
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
          {userData.Skills && userData.Skills.length > 0 ? (
            userData.Skills.map((el) => (
              <p key={el.name} className="tag">
                {el.name}
              </p>
            ))
          ) : (
            <p>Aucune compétence renseignée</p>
          )}
        </section>
        <section className="profile-interests">
          <h2>Intérêts</h2>
          {userData.WantedSkills && userData.WantedSkills.length > 0 ? (
            userData.WantedSkills.map((el) => (
              <p key={el.name} className="tag">
                {el.name}
              </p>
            ))
          ) : (
            <p>Aucun intérêt renseigné</p>
          )}
        </section>
        <section className="profile-fav">
          <h2>Favoris</h2>
          {userData.Follows && userData.Follows.length > 0 ? (
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
        <section className="profile-availabilities">
          <div className="availability-header">
            <h2>Disponibilités</h2>
            {isOwnProfile && !isEditingAvailabilities && (
              <button
                type="button"
                className="btn-icon"
                onClick={() => setIsEditingAvailabilities(true)}
                aria-label="Modifier les disponibilités"
              >
                <Pencil />
              </button>
            )}
          </div>

          {isOwnProfile ? (
            <AvailabilityEditor
              initialAvailabilities={userData.Availabilities}
              editable={isEditingAvailabilities}
              onSave={async (updatedAvailabilities) => {
                const res = await api.patch('/me', {
                  availabilities: updatedAvailabilities,
                });

                setUserData((prev) =>
                  prev
                    ? { ...prev, Availabilities: res.data.user.Availabilities }
                    : prev,
                );
                setIsEditingAvailabilities(false);
              }}
            />
          ) : (
            <div className="profile-availability">
              <div />
              {Object.keys(availabilityMatrix).map((day) => (
                <div key={day} className="profile-availability-day">
                  {day}
                </div>
              ))}
              {['matin', 'midi', 'après-midi', 'soir'].map((timeSlot) => (
                <React.Fragment key={timeSlot}>
                  <div className="profile-availability-slot">{timeSlot}</div>
                  {Object.keys(availabilityMatrix).map((day) => (
                    <div
                      key={`${day}-${timeSlot}`}
                      className={`profile-availability-check ${
                        availabilityMatrix[day][timeSlot] ? 'active' : ''
                      }`}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          )}
        </section>

        <section className="profile-posts">
          <h2>Annonces</h2>
          <div className="posts-container">
            {userData.Posts && userData.Posts.length > 0 ? (
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
            {userData.Reviews && userData.Reviews.length > 0 ? (
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
