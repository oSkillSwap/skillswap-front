import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import './TestimonialCarousel.scss';
import Testimonial from './Testimonial';

function TestimonialCarousel() {
  return (
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
  );
}

export default TestimonialCarousel;
