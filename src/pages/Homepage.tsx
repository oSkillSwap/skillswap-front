import { LogIn, Search } from 'lucide-react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import './Homepage.scss';
import Testimonial from '../components/Testimonial';
import UserCard from '../components/Usercard';

function Homepage() {
  return (
    <main className="homepage container">
      <section className="homepage-hero-section">
        <div className="homepage-hero-section-text">
          <h1>Échangez vos compétences, enrichissez vos savoirs.</h1>
          <p>
            Trouvez des profils prêts à partager leur expertise… gratuitement !
          </p>
        </div>
      </section>

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

      <section className="homepage-section">
        <h1 className="homepage-section-title">Catégories</h1>

        <Swiper
          className="categories"
          spaceBetween={32}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 32,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 32,
            },
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide className="categories-card">
            <img
              className="categories-card-img"
              src="img/icons/graduation-cap.svg"
              alt="Soutien scolaire"
            />
            <p className="categories-card-title">Soutien scolaire</p>
          </SwiperSlide>
          <SwiperSlide className="categories-card">
            <img
              className="categories-card-img"
              src="img/icons/mouse-pointer-click.svg"
              alt="Stratégie digitales"
            />
            <p className="categories-card-title">Stratégie digitales</p>
          </SwiperSlide>
          <SwiperSlide className="categories-card">
            <img
              className="categories-card-img"
              src="img/icons/shirt.svg"
              alt="Couture et retouches"
            />
            <p className="categories-card-title">Couture et retouches</p>
          </SwiperSlide>
          <SwiperSlide className="categories-card">
            <img
              className="categories-card-img"
              src="img/icons/scan-face.svg"
              alt="Beauté et style"
            />
            <p className="categories-card-title">Beauté et style</p>
          </SwiperSlide>
          <SwiperSlide className="categories-card">
            <img
              className="categories-card-img"
              src="img/icons/gauge.svg"
              alt="Coaching de vie"
            />
            <p className="categories-card-title">Coaching de vie</p>
          </SwiperSlide>
          <SwiperSlide className="categories-card">
            <img
              className="categories-card-img"
              src="img/icons/code-xml.svg"
              alt="Dev-pro"
            />
            <p className="categories-card-title">Dev-pro</p>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="homepage-section">
        <div className="homepage-section-textleft">
          <img src="img/home-image.jpg" alt="" />
          <div className="homepage-section-textleft-content">
            <div>
              <h1>Recherchez, proposez, apprenez</h1>
              <p>
                Créez votre profil, décrivez vos savoir-faire, et indiquez ce
                que vous aimeriez apprendre. Chaque compétence est une monnaie
                d'échange.
              </p>
            </div>
            <button className="btn btn-default" type="button">
              <LogIn /> Je m'identifie
            </button>
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <h1 className="homepage-section-title">Ils apprennent déjà</h1>
        <Swiper
          className="profile-cards"
          spaceBetween={32}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <UserCard />
          </SwiperSlide>
          <SwiperSlide>
            <UserCard />
          </SwiperSlide>
          <SwiperSlide>
            <UserCard />
          </SwiperSlide>
          <SwiperSlide>
            <UserCard />
          </SwiperSlide>
          <SwiperSlide>
            <UserCard />
          </SwiperSlide>
          <SwiperSlide>
            <UserCard />
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="homepage-section">
        <h1 className="homepage-section-title">Ce qu'ils en pensent</h1>
        <Swiper
          className="testimonials"
          spaceBetween={32}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <Testimonial />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial />
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="homepage-section">
        <button className="btn btn-default btn-centered" type="button">
          <LogIn /> Je m'identifie
        </button>
      </section>
    </main>
  );
}

export default Homepage;
