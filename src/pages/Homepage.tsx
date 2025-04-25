import { LogIn, Search } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Homepage.scss';
import UserCard from '../components/Usercard';

function Homepage() {
  return (
    <>
      <Header />

      <main className="homepage container">
        <section className="homepage-hero-section">
          <div className="homepage-hero-section-text">
            <h1>Échangez vos compétences, enrichissez vos savoirs.</h1>
            <p>
              Trouvez des profils prêts à partager leur expertise… gratuitement
              !
            </p>
          </div>
        </section>

        <form className="search" action="">
          <input
            className="search-input"
            type="text"
            placeholder="Que souhaitez-vous apprendre aujourd'hui ? (ex. Excel, montage vidéo, programmation...)"
          />
          <button className="search-button">
            <Search />
          </button>
        </form>

        <section className="homepage-section">
          <h1 className="homepage-section-title">Catégories</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            expedita aut, porro nostrum aliquam eum vitae distinctio ullam illum
            consectetur eius nisi asperiores quibusdam, necessitatibus quas nam
            at deleniti illo!
          </p>
        </section>

        <section className="homepage-section section1">
          <img src="img/home-image.jpg" alt="" />
          <div className="section1-content">
            <h1>Recherchez, proposez, apprenez</h1>
            <p>
              Créez votre profil, décrivez vos savoir-faire, et indiquez ce que
              vous aimeriez apprendre. Chaque compétence est une monnaie
              d'échange.
            </p>
            <button className="btn btn-default">
              <LogIn /> Je m'identifie
            </button>
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
      </main>

      <Footer />
    </>
  );
}

export default Homepage;
