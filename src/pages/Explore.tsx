import { Search } from 'lucide-react';
import './Explore.scss';
import Post from '../components/Post';
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
          <Post variant={'post'} origin={'explore'} />
          <Post variant={'post'} origin={'explore'} />
        </div>
      </section>
    </main>
  );
}

export default Explore;
