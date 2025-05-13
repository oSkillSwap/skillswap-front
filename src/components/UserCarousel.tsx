import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import './UserCarousel.scss';
import { useUsers } from '../hooks/useUsers';
import type { IUsers } from '../types/Users';
import UserCard from './UserCard';

function UserCarousel() {
  const { users } = useUsers();
  return (
    <Swiper
      className="profile-carousel"
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
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      }}
      modules={[Autoplay]}
    >
      {users.map((user: IUsers) => {
        return (
          <SwiperSlide key={user.username}>
            <UserCard user={user} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default UserCarousel;
