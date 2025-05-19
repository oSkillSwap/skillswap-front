import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import './CategoryCarousel.scss';
import { useCategories } from '../hooks/useCategories';
import type { ICategories } from '../types/Categories';
import Loader from './Loader';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap = LucideIcons as unknown as Record<string, LucideIcon>;

function CategoryCarousel() {
  const { categories } = useCategories();

  return (
    <>
      <Loader isVisible={isLoading} />
      {!isLoading && (
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
        640: { slidesPerView: 3, spaceBetween: 32 },
        768: { slidesPerView: 4, spaceBetween: 32 },
        1024: { slidesPerView: 5, spaceBetween: 32 },
      }}
      modules={[Autoplay]}
    >
      {categories.map((category: ICategories) => {
        const Icon = iconMap[category.icon] || LucideIcons.HelpCircle;

        return (
          <SwiperSlide
            className="categories-card"
            key={category.id}
            data-id={category.id}
          >
            <Icon className="categories-card-icon" size={36} />
            <p className="categories-card-title">{category.name}</p>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default CategoryCarousel;
