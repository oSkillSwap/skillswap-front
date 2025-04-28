import { Star } from 'lucide-react';
import './Grade.scss';

type IProps = {
  rating: number;
  nbReviews?: number;
};

function Grade({ rating, nbReviews }: IProps) {
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
      {nbReviews && nbReviews > 0 && (
        <p className="grade-nbreviews">({nbReviews} avis)</p>
      )}
    </div>
  );
}

export default Grade;
