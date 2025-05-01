import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import './UserCarousel.scss';
import UserCard from './Usercard';

function UserCarousel() {
  return (
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
  );
}

export default UserCarousel;
