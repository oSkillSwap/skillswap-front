import { LogIn } from "lucide-react";
import "./Homepage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import CategoryCarousel from "../components/CategoryCarousel";
import Searchbar from "../components/Searchbar";
import TestimonialCarousel from "../components/TestimonialCarousel";
import UserCarousel from "../components/UserCarousel";
import { API_URL } from "../config";
import type { ICategoriesHomePage } from "../types/CategoriesHomePage";
import type { IUsersHomePage } from "../types/UsersHomePage";

function Homepage() {
  const [users, setUsers] = useState<IUsersHomePage[] | []>([]);
  const [categories, setCategories] = useState<ICategoriesHomePage[] | []>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`);
        setUsers(response.data.users);
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error("Error fetching users:", error);
      }
    };
    const getCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data.categories);
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error("Error fetching categories:", error);
      }
    };
    getUsers();
    getCategories();
  }, []);

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
        <Searchbar />
      </section>

      <section className="content">
        <h1>Catégories</h1>
        <CategoryCarousel categories={categories} />
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
          <button className="btn btn-default" type="button">
            <LogIn /> Je m'identifie
          </button>
        </div>
      </section>

      <section className="content">
        <h1>Ils apprennent déjà</h1>
        <UserCarousel users={users} />
      </section>

      <section className="content">
        <h1>Ce qu'ils en pensent</h1>
        <TestimonialCarousel />
      </section>

      <section className="content">
        <button className="btn btn-default btn-centered" type="button">
          <LogIn /> Je m'identifie
        </button>
      </section>
    </main>
  );
}

export default Homepage;
