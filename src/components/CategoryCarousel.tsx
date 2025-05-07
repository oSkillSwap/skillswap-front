import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "./CategoryCarousel.scss";
import type { ICategoriesHomePage } from "../types/CategoriesHomePage";

function CategoryCarousel({
  categories,
}: {
  categories: ICategoriesHomePage[];
}) {
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
      {categories.map((category: ICategoriesHomePage) => {
        return (
          <SwiperSlide className="categories-card" key={category.name}>
            <img
              className="categories-card-img"
              src="/img/icons/graduation-cap.svg"
              alt="Soutien scolaire"
            />
            <p className="categories-card-title">{category.name}</p>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default CategoryCarousel;
