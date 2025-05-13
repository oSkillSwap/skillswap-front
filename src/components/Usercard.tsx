import { Heart, MessageSquare } from 'lucide-react';
import './UserCard.scss';
import { Link } from 'react-router';
import type { ISkills } from '../types/Skills';
import type { IUsers } from '../types/Users';
import Grade from './Grade';

function UserCard({ user }: { user: IUsers }) {
  return (
    <article className="profile-card">
      <Link to={`/profile/${user.id}`} className="profile-card-link">
        <img className="profile-card-picture" src={user.avatar} alt="" />
      </Link>
      <div className="profile-card-content-wrapper">
        <div>
          <h3 className="profile-card-username">{user.username}</h3>
          <Grade rating={user.averageGrade} nbReviews={user.nbOfReviews} />
        </div>
        <p className="profile-card-bio">{user.description}</p>

        <div className="profile-card-skills">
          <p className="profile-card-skills-title">Mes compétences :</p>
          <div className="profile-card-skills-tags">
            {user.Skills.map((skill: ISkills) => {
              return (
                <p className="tag" key={skill.name}>
                  {skill.name}
                </p>
              );
            })}
          </div>
        </div>
        <div className="profile-card-interests">
          <p className="profile-card-interests-title">
            Je suis interessé par :
          </p>
          <div className="profile-card-interests-tags">
            {user.WantedSkills.map((skill: ISkills) => {
              return (
                <p className="tag" key={skill.name}>
                  {skill.name}
                </p>
              );
            })}
          </div>
        </div>
        <div className="profile-card-btns">
          <Link className="btn btn-default" to={`/message/${user.id}`}>
            <MessageSquare />
            Contacter
          </Link>
          <button className="btn btn-alt btn-icon" type="button">
            <Heart />
          </button>
        </div>
      </div>
    </article>
  );
}

export default UserCard;
