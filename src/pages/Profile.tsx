import { Heart, MessageSquare } from 'lucide-react';
import './Profile.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Grade from '../components/Grade';
import Post from '../components/Post';
import Testimonial from '../components/Testimonial';
import { API_URL } from '../config';
import type User from '../types/User';

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

  if (user === undefined) user = '1';

  useEffect(() => {
    setIsLoading(true);
    setError('');

    axios
      .get(`${API_URL}/users/${user}`)
      .then((response) => {
        setUserData(response.data.user);
        setIsLoading(false);
      })
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

  // Availability matrix to display the user's availability
  // By default, all time slots are set to false (not available)
  const availabilityMatrix: IAvailabilityMatrix = {
    Lundi: { matin: false, midi: false, 'après-midi': false, soir: false },
    Mardi: { matin: false, midi: false, 'après-midi': false, soir: false },
    Mercredi: { matin: false, midi: false, 'après-midi': false, soir: false },
    Jeudi: { matin: false, midi: false, 'après-midi': false, soir: false },
    Vendredi: { matin: false, midi: false, 'après-midi': false, soir: false },
    Samedi: { matin: false, midi: false, 'après-midi': false, soir: false },
    Dimanche: { matin: false, midi: false, 'après-midi': false, soir: false },
  };

  // Populate the availability matrix with the user's data
  for (const availability of userData.Availabilities) {
    availabilityMatrix[availability.day_of_the_week][availability.time_slot] =
      true;
  }

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
              <h1>{userData.username}</h1>
              <p className="tag tag-primary">Disponible</p>
            </div>
            <Grade
              rating={+userData.averageGrade}
              nbReviews={+userData.nbOfReviews}
            />
          </div>
          <p>{userData.description}</p>
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
          <h2>Disponibilités</h2>
          <div className="profile-availability">
            <div />
            {Object.keys(availabilityMatrix).map((day) => (
              <div key={day} className="profile-availability-day">
                {day}
              </div>
            ))}

            {['matin', 'midi', 'après-midi', 'soir'].map((timeSlot) => (
              <>
                <div key={timeSlot} className="profile-availability-slot">
                  {timeSlot}
                </div>
                {Object.keys(availabilityMatrix).map((day) => (
                  <div
                    key={`${day}-${timeSlot}`}
                    className={`profile-availability-check ${
                      availabilityMatrix[day][timeSlot] ? 'active' : ''
                    }`}
                  />
                ))}
              </>
            ))}
          </div>
        </section>

        <section className="profile-posts">
          <h2>Annonces</h2>
          <div className="posts-container">
            <Post variant="post" origin="profile" />
            <Post variant="post" origin="profile" />
          </div>
        </section>

        <section className="profile-testimonials">
          <h2>Avis</h2>
          <div className="testimonials">
            <Testimonial />
            <Testimonial />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;
