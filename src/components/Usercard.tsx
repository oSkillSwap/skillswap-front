import { Heart, MessageSquare, Star } from 'lucide-react';
import './Usercard.scss';

function UserCard() {
  return (
    <article className="profile">
      <img className="profile-picture" src="img/avatars/robot1.jpg" alt="" />
      <div className="profile-content-wrapper">
        <div>
          <h3 className="profile-username">Username</h3>
          <div className="profile-grade">
            <p className="profile-grade-stars">
              <Star className="star star-active" />
              <Star className="star star-active" />
              <Star className="star star-active" />
              <Star className="star star-active" />
              <Star className="star" />
            </p>
            <p className="profile-grade-nbreviews">(3 avis)</p>
          </div>
        </div>
        <p className="profile-bio">
          J'aide volontiers à réparer vos appareils du quotidien. En échange, je
          cherche à mieux maîtriser les outils bureautiques et le montage vidéo.
        </p>

        <div className="profile-skills">
          <p className="profile-skills-title">Mes compétences :</p>
          <div className="profile-skills-tags">
            <p className="tag">React</p>
            <p className="tag">React</p>
            <p className="tag">React</p>
          </div>
        </div>
        <div className="profile-interests">
          <p className="profile-interests-title">Je suis interessé par :</p>
          <div className="profile-interests-tags">
            <p className="tag">Angular</p>
            <p className="tag">Angular</p>
            <p className="tag">Angular</p>
          </div>
        </div>
        <div className="profile-buttons">
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
