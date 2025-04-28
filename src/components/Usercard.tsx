import { Heart, MessageSquare } from 'lucide-react';
import './Usercard.scss';
import Grade from './Grade';

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
          <Grade rating={4} nbReviews={3} />
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
          <button className="btn btn-default" type="button">
            <MessageSquare />
            Contacter
          </button>
          <button className="btn btn-alt btn-icon" type="button">
            <Heart />
          </button>
        </div>
      </div>
    </article>
  );
}

export default UserCard;
