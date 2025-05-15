import Post from '../components/Post';
import Searchbar from '../components/Searchbar';
import UserCard from '../components/UserCard';
import type { IUsers } from '../types/Users';
import './Explore.scss';
import { FileSearch, UserSearch } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useSearch } from '../hooks/useSearch';
import type { IPosts } from '../types/Posts';
import PageTransition from '../utils/PageTransition';

function Explore() {
  const { searchUsers, searchPosts, handleSearch } = useSearch();
  const [searchOpt, setSearchOpt] = useState('post');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) handleSearch(search);
  }, [searchParams, handleSearch]);

  return (
    <main className="explore container">
      <section className="content">
        <h1 className="pour-le-lore">
          <span>G</span>
          <span>O</span>
          <span>O</span>
          <span>G</span>
          <span>L</span>
          <span>E</span>
          <span>S</span>
          <span>W</span>
          <span>A</span>
          <span>P</span>
        </h1>
        <Searchbar handleSearch={handleSearch} />
        <div className="explore-btns">
          <button
            className={`btn ${searchOpt === 'post' ? 'btn-default' : 'btn-alt'}`}
            type="button"
            onClick={() => setSearchOpt('post')}
          >
            <FileSearch />
            Annonces
          </button>
          <button
            className={`btn ${searchOpt === 'user' ? 'btn-default' : 'btn-alt'}`}
            type="button"
            onClick={() => setSearchOpt('user')}
          >
            <UserSearch />
            Profils
          </button>
        </div>

        <div className="content-results">
          {searchOpt === 'user'
            ? searchUsers.map((user: IUsers) => {
                return <UserCard user={user} key={user.username} />;
              })
            : searchPosts.map((post: IPosts) => {
                return (
                  <Post
                    variant={'post'}
                    origin={'explore'}
                    key={post.id}
                    data={post}
                  />
                );
              })}
        </div>
      </section>

      {/* <section className="content">
        <h1>Catégories</h1>
        <CategoryCarousel />
      </section> */}
    </main>
  );
}

export default PageTransition(Explore);
