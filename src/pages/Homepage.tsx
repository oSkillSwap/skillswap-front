import { CirclePlus, LogIn } from 'lucide-react';
import './Homepage.scss';
import { useNavigate } from 'react-router';
import heroImage from '/src/assets/img/hero-image.webp';
import homeImage from '/src/assets/img/home-image.webp';
import CategoryCarousel from '../components/CategoryCarousel';
import Searchbar from '../components/Searchbar';
import TestimonialCarousel from '../components/TestimonialCarousel';
import UserCarousel from '../components/UserCarousel';
import { useAuth } from '../contexts/AuthContext';
import { useSearch } from '../hooks/useSearch';
import PageTransition from '../utils/PageTransition';

function Homepage() {
  const { handleSearch } = useSearch();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <main className="homepage container">
      <section className="homepage-hero">
        <img
          src={heroImage}
          alt="Astronaute assis interagissant par visioconférence avec une collègue à travers un robot flottant dans une station spatiale."
        />
        <div className="homepage-hero-text">
          <h1>Échangez vos compétences, enrichissez vos savoirs.</h1>
          <p>
            Trouvez des profils prêts à partager leur expertise… gratuitement !
          </p>
          {!user ? (
            <button
              className="btn btn-default"
              type="button"
              onClick={() => navigate('/login')}
            >
              <LogIn /> Je m'identifie
            </button>
          ) : (
            <button
              className="btn btn-default"
              type="button"
              onClick={() => navigate('/post')}
            >
              <CirclePlus /> Poster une annonce
            </button>
          )}
        </div>
      </section>

      <section className="content">
        <Searchbar handleSearch={handleSearch} />
      </section>

      <section className="content">
        <h1>Catégories</h1>
        <CategoryCarousel />
      </section>

      <section className="content homepage-content-imgleft">
        <img
          src={homeImage}
          alt="Astronaute souriante marchant dans une station spatiale tout en tenant un dossier et en saluant."
        />
        <div>
          <h1>Recherchez, proposez, apprenez</h1>
          <p>
            Créez votre profil, décrivez vos savoir-faire, et indiquez ce que
            vous aimeriez apprendre. Chaque compétence est une monnaie
            d'échange.
          </p>
          {!user ? (
            <button
              className="btn btn-default"
              type="button"
              onClick={() => navigate('/login')}
            >
              <LogIn /> Je m'identifie
            </button>
          ) : (
            <button
              className="btn btn-default"
              type="button"
              onClick={() => navigate('/post')}
            >
              <CirclePlus /> Poster une annonce
            </button>
          )}
        </div>
      </section>

      <section className="content">
        <h1>Ils apprennent déjà</h1>
        <UserCarousel />
      </section>

      <section className="content">
        <h1>Ce qu'ils en pensent</h1>
        <TestimonialCarousel />
      </section>

      {!user ? (
        <section className="content">
          <button
            className="btn btn-default btn-centered"
            type="button"
            onClick={() => navigate('/login')}
          >
            <LogIn /> Je m'identifie
          </button>
        </section>
      ) : (
        <section className="content">
          <button
            className="btn btn-default btn-centered"
            type="button"
            onClick={() => navigate('/post')}
          >
            <CirclePlus /> Poster une annonce
          </button>
        </section>
      )}
    </main>
  );
}

export default PageTransition(Homepage);
