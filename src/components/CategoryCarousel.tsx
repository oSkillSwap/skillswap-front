import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import './CategoryCarousel.scss';

function CategoryCarousel() {
  return (
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
  );
}

export default CategoryCarousel;
