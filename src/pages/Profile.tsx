import { Heart, MessageSquare } from 'lucide-react';
import './Profile.scss';
import Grade from '../components/Grade';
import Post from '../components/Post';
import Testimonial from '../components/Testimonial';

function Profile() {
  return (
    <main className="profile container">
      <section className="profile-header">
        <img
          className="profile-header-picture"
          src="img/avatars/robot1.jpg"
          alt=""
        />
        <div className="profile-header-content">
          <div>
            <div className="profile-header-content-title">
              <h1>OtherUser</h1>
              <p className="tag tag-primary">Disponnible</p>
            </div>
            <Grade rating={2} nbReviews={12} />
          </div>
          <p>
            J'aide volontiers à réparer vos appareils du quotidien. En échange,
            je cherche à mieux maîtriser les outils bureautiques et le montage
            vidéo.
          </p>
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
          <p className="tag">REACT</p>
          <p className="tag">Typescript</p>
          <p className="tag">Next.js</p>
          <p className="tag">Next.js</p>
          <p className="tag">Next.js</p>
        </section>
        <section className="profile-interests">
          <h2>Intérêts</h2>
          <p className="tag">Angular</p>
          <p className="tag">Python</p>
          <p className="tag">Typescript</p>
        </section>
        <section className="profile-fav">
          <h2>Favoris</h2>
          <img
            className="profile-fav-picture"
            src="img/avatars/robot1.jpg"
            alt=""
          />
          <img
            className="profile-fav-picture"
            src="img/avatars/robot1.jpg"
            alt=""
          />
          <img
            className="profile-fav-picture"
            src="img/avatars/robot1.jpg"
            alt=""
          />
          <img
            className="profile-fav-picture"
            src="img/avatars/robot1.jpg"
            alt=""
          />
          <img
            className="profile-fav-picture"
            src="img/avatars/robot1.jpg"
            alt=""
          />
          <img
            className="profile-fav-picture"
            src="img/avatars/robot1.jpg"
            alt=""
          />
        </section>
      </div>
      <div className="profile-col2">
        <section className="profile-availabilities">
          <h2>Disponibilités</h2>
          <div className="profile-availability">
            <div />
            <div className="profile-availability-day">Lun</div>
            <div className="profile-availability-day">Mar</div>
            <div className="profile-availability-day">Mer</div>
            <div className="profile-availability-day">Jeu</div>
            <div className="profile-availability-day">Ven</div>
            <div className="profile-availability-day">Sam</div>
            <div className="profile-availability-day">Dim</div>

            <div className="profile-availability-slot">Matin</div>
            <div className="profile-availability-check" />
            <div className="profile-availability-check" />
            <div className="profile-availability-check" />
            <div className="profile-availability-check" />
            <div className="profile-availability-check" />
            <div className="profile-availability-check" />
            <div className="profile-availability-check" />

            <div className="profile-availability-slot">Midi</div>
            <div className="profile-availability-check active" />
            <div className="profile-availability-check" />
            <div className="profile-availability-check active" />
            <div className="profile-availability-check" />
            <div className="profile-availability-check" />
            <div className="profile-availability-check" />
            <div className="profile-availability-check" />

            <div className="profile-availability-slot">Après-midi</div>
            <div className="profile-availability-check active" />
            <div className="profile-availability-check active" />
            <div className="profile-availability-check active" />
            <div className="profile-availability-check" />
            <div className="profile-availability-check active" />
            <div className="profile-availability-check" />
            <div className="profile-availability-check" />

            <div className="profile-availability-slot">Soir</div>
            <div className="profile-availability-check" />
            <div className="profile-availability-check" />
            <div className="profile-availability-check active" />
            <div className="profile-availability-check active" />
            <div className="profile-availability-check" />
            <div className="profile-availability-check" />
            <div className="profile-availability-check" />
          </div>
        </section>

        <section className="profile-posts">
          <h2>Annonces</h2>
          <div className="posts-container">
            <Post variant={'post'} origin={'profile'} />
            <Post variant={'post'} origin={'profile'} />
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
