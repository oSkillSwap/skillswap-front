import { Link } from 'react-router';
import PageTransition from '../../utils/PageTransition';
import './ErrorPage404.scss';
import { Undo2 } from 'lucide-react';
import bg from '/src/assets/img/404-bg.webp';
import char from '/src/assets/img/404-character.webp';

function ErrorPage404() {
  return (
    <main className="error404 container">
      <section className="content">
        <div className="scene">
          <img
            className="scene-bg"
            src={bg}
            alt="L'espace avec quelques étoiles"
          />
          <img
            className="scene-char"
            src={char}
            alt="Cosmonaute perdu dans l'espace"
          />
        </div>
        <h1>404</h1>
        <p>Hmmm... Il semblerait que vous vous soyez perdu...</p>
        <Link className="btn btn-default btn-icon" to="/">
          <Undo2 />
          Retourner vers l'accueil
        </Link>
      </section>
    </main>
  );
}

export default PageTransition(ErrorPage404);
