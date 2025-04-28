import { LogIn, Search } from 'lucide-react';
import './Homepage.scss';
import Testimonial from '../components/Testimonial';
import UserCard from '../components/Usercard';

function Homepage() {
  return (
    <main className="homepage container">
      <section className="homepage-hero-section">
        <div className="homepage-hero-section-text">
          <h1>Échangez vos compétences, enrichissez vos savoirs.</h1>
          <p>
            Trouvez des profils prêts à partager leur expertise… gratuitement !
          </p>
        </div>
      </section>

      <form className="search" action="">
        <input
          className="search-input"
          type="text"
          placeholder="Que souhaitez-vous apprendre aujourd'hui ? (ex. Excel, montage vidéo, programmation...)"
        />
        <button className="search-button" type="button">
          <Search />
        </button>
      </form>

      <section className="homepage-section">
        <h1 className="homepage-section-title">Catégories</h1>
        <div className="categories">
          <div className="categories-card">
            <img
              className="categories-card-img"
              src="img/icons/graduation-cap.svg"
              alt="Soutien scolaire"
            />
            <p className="categories-card-title">Soutien scolaire</p>
          </div>
          <div className="categories-card">
            <img
              className="categories-card-img"
              src="img/icons/mouse-pointer-click.svg"
              alt="Stratégie digitales"
            />
            <p className="categories-card-title">Stratégie digitales</p>
          </div>
          <div className="categories-card">
            <img
              className="categories-card-img"
              src="img/icons/shirt.svg"
              alt="Couture et retouches"
            />
            <p className="categories-card-title">Couture et retouches</p>
          </div>
          <div className="categories-card">
            <img
              className="categories-card-img"
              src="img/icons/scan-face.svg"
              alt="Beauté et style"
            />
            <p className="categories-card-title">Beauté et style</p>
          </div>
          <div className="categories-card">
            <img
              className="categories-card-img"
              src="img/icons/gauge.svg"
              alt="Coaching de vie"
            />
            <p className="categories-card-title">Coaching de vie</p>
          </div>
          <div className="categories-card">
            <img
              className="categories-card-img"
              src="img/icons/code-xml.svg"
              alt="Dev-pro"
            />
            <p className="categories-card-title">Dev-pro</p>
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <div className="homepage-section-textleft">
          <img src="img/home-image.jpg" alt="" />
          <div className="homepage-section-textleft-content">
            <div>
              <h1>Recherchez, proposez, apprenez</h1>
              <p>
                Créez votre profil, décrivez vos savoir-faire, et indiquez ce
                que vous aimeriez apprendre. Chaque compétence est une monnaie
                d'échange.
              </p>
            </div>
            <button className="btn btn-default" type="button">
              <LogIn /> Je m'identifie
            </button>
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <h1 className="homepage-section-title">Ils apprennent déjà</h1>
        <div className="profile-cards">
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </section>

      <section className="homepage-section">
        <h1 className="homepage-section-title">Ce qu'ils en pensent</h1>
        <div className="testimonials">
          <Testimonial />
          <Testimonial />
          <Testimonial />
        </div>
      </section>
    </main>
  );
}

export default Homepage;
