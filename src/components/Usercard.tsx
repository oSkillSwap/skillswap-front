import { Heart, MessageSquare, Star } from 'lucide-react';
import './Usercard.scss';

function UserCard() {
  return (
    <article className="profile-card">
      <img
        className="profile-card-picture"
        src="img/avatars/robot1.jpg"
        alt=""
      />
      <div className="profile-card-content-wrapper">
        <div>
          <h3 className="profile-card-username">Username</h3>
          <div className="profile-card-grade">
            <div className="profile-card-grade-stars">
              <Star className="star star-active" />
              <Star className="star star-active" />
              <Star className="star star-active" />
              <Star className="star star-active" />
              <Star className="star" />
            </div>
            <p className="profile-card-grade-nbreviews">(3 avis)</p>
          </div>
        </div>
        <p className="profile-card-bio">
          J'aide volontiers à réparer vos appareils du quotidien. En échange, je
          cherche à mieux maîtriser les outils bureautiques et le montage vidéo.
        </p>

        <div className="profile-card-skills">
          <p className="profile-card-skills-title">Mes compétences :</p>
          <div className="profile-card-skills-tags">
            <p className="tag">React</p>
            <p className="tag">React</p>
            <p className="tag">React</p>
          </div>
        </div>
        <div className="profile-card-interests">
          <p className="profile-card-interests-title">
            Je suis interessé par :
          </p>
          <div className="profile-card-interests-tags">
            <p className="tag">Angular</p>
            <p className="tag">Angular</p>
            <p className="tag">Angular</p>
          </div>
        </div>
        <div className="profile-card-buttons">
          <button className="btn btn-default">
            <MessageSquare />
            Contacter
          </button>
          <button className="btn btn-alt btn-icon">
            <Heart />
          </button>
        </div>
      </div>
    </article>
  );
}

export default UserCard;
