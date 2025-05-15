import './Testimonial.scss';
import { Link } from 'react-router';
import type User from '../types/User';
import Grade from './Grade';

function Testimonial({ data }: { data: User['Reviews'][0] }) {
  const isDeleted = !data.Reviewer;

  return (
    <article className="testimonials-card">
      {isDeleted ? (
        <img
          className="testimonials-card-picture deleted-user"
          src="/img/avatars/robot1.jpg"
          alt="Utilisateur supprimé"
        />
      ) : (
        <Link to={`/profile/${data.Reviewer.id}`}>
          <img
            className="testimonials-card-picture"
            src={data.Reviewer.avatar}
            alt={data.Reviewer.username}
          />
        </Link>
      )}

      <div className="testimonials-card-title">
        <h3>{data.title}</h3>
        <Grade rating={data.grade} />
      </div>

      <p className="testimonials-card-comment">{data.content}</p>

      <p className="testimonials-card-info">
        {isDeleted ? 'Utilisateur supprimé' : data.Reviewer.username},{' le '}
        {new Date(data.createdAt).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </article>
  );
}

export default Testimonial;
