import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import './TestimonialCarousel.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '../services/api';
import type Review from '../types/Review';
import Testimonial from './Testimonial';

function TestimonialCarousel() {
  const [reviews, setReviews] = useState<Review[] | []>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');

    const fetchReviews = async () => {
      try {
        const response = await api.get('/reviews');
        setReviews(response.data.reviews);
      } catch (error) {
        if (axios.isAxiosError(error) && error.message) {
          setError(error.message);
        } else {
          setError('Une erreur inattendue s’est produite.');
        }
      }
    };

    fetchReviews();
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
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      //   pauseOnMouseEnter: true,
      // }}
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
      // modules={[Autoplay]}
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
