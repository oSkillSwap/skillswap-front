import './Explore.scss';
import Categories from '../components/Categories';
import Post from '../components/Post';
import Searchbar from '../components/Searchbar';
import UserCard from '../components/Usercard';

function Explore() {
  return (
    <main className="explore container">
      <Searchbar />

      <section className="content">
        <h1>Catégories</h1>
        <Categories />
      </section>

      <section className="content">
        <h1>Résultats : Profils trouvés</h1>
        <div className="content-results">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </section>

      <section className="content">
        <h1>Résultats : Annonces trouvés</h1>
        <div className="content-results">
          <Post variant={'post'} origin={'profile'} />
          <Post variant={'post'} origin={'profile'} author={true} />
          <Post
            variant={'post'}
            origin={'profile'}
            author={true}
            offers={[{ username: 'AnotherUser' }, { username: 'OtherUser' }]}
          />
          <Post variant={'post'} origin={'explore'} />
          <Post variant={'offer'} origin={'profile'} />
          <Post variant={'trade'} origin={'profile'} />
          <Post variant={'trade'} origin={'profile'} isFinished={true} />
          <Post
            variant={'trade'}
            origin={'profile'}
            isFinished={true}
            author={true}
          />
          <Post
            variant={'trade'}
            origin={'profile'}
            isFinished={true}
            reviewed={true}
          />
        </div>
      </section>
    </main>
  );
}

export default Explore;
