import './Testimonial.scss';
import { Link } from 'react-router';
import type User from '../types/User';
import Grade from './Grade';

function Testimonial({ data }: { data: User['Reviews'][0] }) {
  return (
    <article className="testimonials-card">
      <Link to={`/profile/${data.Reviewer.id}`}>
        <img
          className="testimonials-card-picture"
          src={data.Reviewer.avatar}
          alt={data.Reviewer.username}
        />
      </Link>
      <div className="testimonials-card-title">
        <h3>{data.title}</h3>
        <Grade rating={data.grade} />
      </div>
      <p className="testimonials-card-comment">{data.content}</p>
      <p className="testimonials-card-info">
        {data.Reviewer.username}, {data.updatedAt}
      </p>
    </article>
  );
}

export default Testimonial;
