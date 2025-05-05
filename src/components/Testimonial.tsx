import './Testimonial.scss';
import { Link } from 'react-router';
import Grade from './Grade';

function Testimonial() {
  return (
    <article className="testimonials-card">
      <Link to={'/profile'}>
        <img
          className="testimonials-card-picture"
          src="/img/avatars/robot1.jpg"
          alt=""
        />
      </Link>
      <div className="testimonials-card-title">
        <h3>Vraiment génial !</h3>
        <Grade rating={3} />
      </div>
      <p className="testimonials-card-comment">
        J'ai échangé mes compétences en graphisme contre des cours de guitare,
        et c'était une expérience incroyable. Simple, humain, et tellement
        enrichissant !
      </p>
      <p className="testimonials-card-info">Username, le 22 avril 2025</p>
    </article>
  );
}

export default Testimonial;
