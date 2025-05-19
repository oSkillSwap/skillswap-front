import { Link } from 'react-router';
import PageTransition from '../../utils/PageTransition';
import './ErrorPage404.scss';
import { Undo2 } from 'lucide-react';

function ErrorPage404() {
  return (
    <main className="error404 container">
      <section className="content">
        <div className="scene">
          <img className="scene-bg" src="/src/assets/img/404-bg.png" alt="" />
          <img
            className="scene-char"
            src="/src/assets/img/404-character.png"
            alt=""
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
