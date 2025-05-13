import { Star } from 'lucide-react';
import './Grade.scss';

type GradeProps = {
  rating?: number;
  nbReviews?: number;
};

function Grade({ rating = 0, nbReviews }: GradeProps) {
  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star key={i} className={`star ${i < rating ? 'star-active' : ''}`} />,
      );
    }

    return stars;
  };

  return (
    <div className="grade">
      <div className="grade-stars">{renderStars()}</div>
      <p className="grade-nbreviews">({nbReviews} avis)</p>
    </div>
  );
}

export default Grade;
