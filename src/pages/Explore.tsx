import CategoryCarousel from "../components/CategoryCarousel";
import Post from "../components/Post";
import Searchbar from "../components/Searchbar";
import UserCard from "../components/UserCard";
import type { IUsers } from "../types/Users";
import "./Explore.scss";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useSearch } from "../hooks/useSearch";
import type { IPosts } from "../types/Posts";

function Explore() {
  const { searchUsers, searchPosts, handleSearch } = useSearch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) handleSearch(search);
  }, [searchParams, handleSearch]);

  return (
    <main className="explore container">
      <section className="content">
        <Searchbar handleSearch={handleSearch} />
      </section>

      <section className="content">
        <h1>Catégories</h1>
        <CategoryCarousel />
      </section>

      <section className="content">
        <h1>Résultats : Profils trouvés</h1>
        <div className="content-results">
          {searchUsers.map((user: IUsers) => {
            return <UserCard user={user} key={user.username} />;
          })}
        </div>
      </section>

      <section className="content">
        <h1>Résultats : Annonces trouvées</h1>
        <div className="content-results">
          {searchPosts.map((post: IPosts) => {
            return (
              <Post
                variant={"post"}
                origin={"explore"}
                key={post.id}
                data={post}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Explore;
