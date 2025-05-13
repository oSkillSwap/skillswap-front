import { LogIn } from "lucide-react";
import "./Homepage.scss";
import {} from "react";
import { useNavigate } from "react-router";
import CategoryCarousel from "../components/CategoryCarousel";
import Searchbar from "../components/Searchbar";
import TestimonialCarousel from "../components/TestimonialCarousel";
import UserCarousel from "../components/UserCarousel";
import { useAuth } from "../contexts/AuthContext";
import { useSearch } from "../hooks/useSearch";
import PageTransition from "../utils/PageTransition";

function Homepage() {
  const { handleSearch } = useSearch();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <main className="homepage container">
      <section className="homepage-hero">
        <img src="img/hero-image.jpg" alt="" />
        <div className="homepage-hero-text">
          <h1>Échangez vos compétences, enrichissez vos savoirs.</h1>
          <p>
            Trouvez des profils prêts à partager leur expertise… gratuitement !
          </p>
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
        <img src="img/home-image.jpg" alt="" />
        <div>
          <h1>Recherchez, proposez, apprenez</h1>
          <p>
            Créez votre profil, décrivez vos savoir-faire, et indiquez ce que
            vous aimeriez apprendre. Chaque compétence est une monnaie
            d'échange.
          </p>
          {!user && (
            <button
              className="btn btn-default"
              type="button"
              onClick={() => navigate("/login")}
            >
              <LogIn /> Je m'identifie
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

      {!user && (
        <section className="content">
          <button
            className="btn btn-default btn-centered"
            type="button"
            onClick={() => navigate("/login")}
          >
            <LogIn /> Je m'identifie
          </button>
        </section>
      )}
    </main>
  );
}

export default PageTransition(Homepage);
