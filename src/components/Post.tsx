import {
  MessageSquare,
  Send,
  SquareCheck,
  SquarePen,
  SquareX,
  Trash,
} from 'lucide-react';
import './Post.scss';
import Grade from './Grade';

type PostProps = {
  variant: 'post' | 'offer' | 'trade';
  origin: 'profile' | 'explore';
  author?: boolean;
  offers?: { username: string }[];
};

function Post({ variant, origin, offers, author = false }: PostProps) {
  return (
    <article className="post">
      <div>
        <div className="post-title">
          <h3>Titre de l'annonce</h3>
          <p className="tag">Next.js</p>
        </div>
        <p className="post-info">Posté le 24 avril 2025</p>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
        molestias perferendis quisquam omnis quaerat cum harum ullam! Mollitia
        harum perspiciatis eius totam quaerat aliquid in, impedit quasi ipsam
        incidunt esse.
      </p>
      {origin === 'profile' && (
        <div className="post-btns">
          {variant === 'post' &&
            (author ? (
              <>
                <button className="btn btn-alt" type="button">
                  <SquarePen />
                  Modifier
                </button>
                <button className="btn btn-alt btn-icon" type="button">
                  <Trash />
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-default" type="button">
                  <Send />
                  Proposer
                </button>
                <button className="btn btn-alt" type="button">
                  Voir l'annonce
                </button>
              </>
            ))}
          {variant === 'offer' && (
            <>
              <button className="btn btn-default" type="button">
                <Send />
                Proposer
              </button>
              <button className="btn btn-alt" type="button">
                Voir l'annonce
              </button>
            </>
          )}
          {variant === 'trade' && (
            <>
              <button className="btn btn-default" type="button">
                <Send />
                Proposer
              </button>
              <button className="btn btn-alt" type="button">
                Voir l'annonce
              </button>
            </>
          )}
        </div>
      )}
      {offers?.map((el) => {
        return (
          <div key={el.username} className="post-offer">
            <div>
              <div className="post-offer-userinfo">
                <img
                  className="post-offer-userinfo-picture"
                  src="img/avatars/robot1.jpg"
                  alt=""
                />
                <div>
                  <h3>{el.username}</h3>
                  <Grade rating={4} nbReviews={3} />
                </div>
              </div>
              <p className="post-offer-date">Reçu le 24 avril 2025 à 11h52</p>
            </div>

            <div className="post-offer-btns">
              <button className="btn btn-reversed btn-icon" type="button">
                <MessageSquare />
              </button>
              <button className="btn btn-default" type="button">
                <SquareCheck />
                Accepter
              </button>
              <button className="btn btn-secondary" type="button">
                <SquareX />
                Refuser
              </button>
            </div>
          </div>
        );
      })}
      {origin === 'explore' && (
        <div className="post-author">
          <div>
            <div className="post-author-userinfo">
              <img
                className="post-author-userinfo-picture"
                src="img/avatars/robot1.jpg"
                alt=""
              />
              <div>
                <h3>Author</h3>
                <Grade rating={4} nbReviews={3} />
              </div>
            </div>
          </div>

          <div className="post-author-btns">
            <button className="btn btn-reversed" type="button">
              <MessageSquare />
              Contacter
            </button>
            <button className="btn btn-default" type="button">
              <Send />
              Proposer
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default Post;
