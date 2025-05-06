import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import './TestimonialCarousel.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../config';
import type Review from '../types/Review';
import Testimonial from './Testimonial';

function TestimonialCarousel() {
  const [reviews, setReviews] = useState<Review[] | []>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');

    axios
      .get(`${API_URL}/reviews`)
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error !== '' || !reviews) {
    return (
      <main className="container">
        <h1>{error}</h1>
      </main>
    );
  }
  return (
    <Swiper
      className="testimonial-carousel"
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
      {reviews.map((review) => (
        <SwiperSlide key={review.id}>
          <Testimonial data={review} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default TestimonialCarousel;
