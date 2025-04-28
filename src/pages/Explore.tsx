import { Search, Send } from 'lucide-react';
import './Explore.scss';
import UserCard from '../components/Usercard';

function Explore() {
  return (
    <main className="explore container">
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

      <section className="content">
        <h1 className="content-title">Catégories</h1>
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

      <section className="content">
        <h1 className="content-title">Résultats : Profils trouvés</h1>
        <div className="content-results">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </section>

      <section className="content">
        <h1 className="content-title">Résultats : Annonces trouvés</h1>
        <div className="content-results">
          <article className="post">
            <div>
              <div className="post-title">
                <h3>Titre de l'annonce</h3>
                <p className="tag">Next.js</p>
              </div>
              <p className="post-info">Posté le 24 avril 2025</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              molestias perferendis quisquam omnis quaerat cum harum ullam!
              Mollitia harum perspiciatis eius totam quaerat aliquid in, impedit
              quasi ipsam incidunt esse.
            </p>
            <div className="post-btns">
              <button className="btn btn-default" type="button">
                <Send />
                Proposer
              </button>
              <button className="btn btn-alt" type="button">
                Voir l'annonce
              </button>
            </div>
          </article>
          <article className="post">
            <div>
              <div className="post-title">
                <h3>Titre de l'annonce</h3>
                <p className="tag">Next.js</p>
              </div>
              <p className="post-info">Posté le 24 avril 2025</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              molestias perferendis quisquam omnis quaerat cum harum ullam!
              Mollitia harum perspiciatis eius totam quaerat aliquid in, impedit
              quasi ipsam incidunt esse.
            </p>
            <div className="post-btns">
              <button className="btn btn-default" type="button">
                <Send />
                Proposer
              </button>
              <button className="btn btn-alt" type="button">
                Voir l'annonce
              </button>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Explore;
