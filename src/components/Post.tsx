import {
  ArrowLeft,
  ArrowRight,
  HandHelping,
  Handshake,
  MessageSquare,
  SquareCheckBig,
  SquarePen,
  SquareX,
  Star,
  Trash,
} from 'lucide-react';
import './Post.scss';
import Grade from './Grade';

type PostProps = {
  variant: 'post' | 'offer' | 'trade';
  origin: 'profile' | 'explore';
  author?: boolean;
  offers?: { username: string }[];
  isFinished?: boolean;
  reviewed?: boolean;
};

function Post({
  variant,
  origin,
  offers,
  author,
  isFinished,
  reviewed,
}: PostProps) {
  return (
    <article className="post">
      <div className="post-header">
        {variant === 'trade' &&
          (author ? (
            <p className="post-header-arrow">
              <ArrowLeft />
            </p>
          ) : (
            <p className="post-header-arrow arrow-alt">
              <ArrowRight />
            </p>
          ))}

        <div>
          <div className="post-header-title">
            <h3>Titre de l'annonce</h3>
            <p className="tag">Next.js</p>
          </div>
          <p className="post-header-date">Posté le 24 avril 2025</p>
        </div>
      </div>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
        molestias perferendis quisquam omnis quaerat cum harum ullam! Mollitia
        harum perspiciatis eius totam quaerat aliquid in, impedit quasi ipsam
        incidunt esse.
      </p>
      {origin === 'profile' && (
        <>
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
                    <HandHelping />
                    Proposer
                  </button>
                </>
              ))}
          </div>

          {variant === 'offer' && (
            <div className="post-author">
              <div>
                <div className="post-author-userinfo">
                  <img
                    className="post-author-userinfo-picture"
                    src="/img/avatars/robot1.jpg"
                    alt=""
                  />
                  <div>
                    <h3>Author</h3>
                    <Grade rating={4} nbReviews={3} />
                  </div>
                </div>
                <p className="post-offer-date">
                  Envoyé le 24 avril 2025 à 11h52
                </p>
              </div>

              <div className="post-author-btns">
                <button className="btn btn-reversed" type="button">
                  <MessageSquare />
                  Contacter
                </button>
                <button className="btn btn-secondary" type="button">
                  <SquareX />
                  Annuler
                </button>
              </div>
            </div>
          )}

          {variant === 'trade' && (
            <div className="post-author">
              <div>
                <div className="post-author-userinfo">
                  <img
                    className="post-author-userinfo-picture"
                    src="/img/avatars/robot1.jpg"
                    alt=""
                  />
                  <div>
                    <h3>Author</h3>
                    <Grade rating={4} nbReviews={3} />
                  </div>
                </div>
                <p className="post-offer-date">
                  {isFinished ? 'Terminé' : 'Accepté'} le 24 avril 2025 à 11h52
                </p>
              </div>

              <div className="post-author-btns">
                {isFinished ? (
                  author ? (
                    <button className="btn btn-secondary" type="button">
                      <Star />
                      Voir l'avis
                    </button>
                  ) : reviewed ? (
                    <button className="btn btn-secondary" type="button">
                      <Star />
                      Modifier l'avis
                    </button>
                  ) : (
                    <button className="btn btn-default" type="button">
                      <Star />
                      Laisser un avis
                    </button>
                  )
                ) : (
                  <>
                    <button className="btn btn-reversed" type="button">
                      <MessageSquare />
                      Contacter
                    </button>
                    <button className="btn btn-default" type="button">
                      <SquareCheckBig />
                      Terminer
                    </button>
                    <button className="btn btn-secondary" type="button">
                      <SquareX />
                      Annuler
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {offers?.map((el) => {
        return (
          <div key={el.username} className="post-offer">
            <div>
              <div className="post-offer-userinfo">
                <img
                  className="post-offer-userinfo-picture"
                  src="/img/avatars/robot1.jpg"
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
                <Handshake />
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
                src="/img/avatars/robot1.jpg"
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
              <HandHelping />
              Proposer
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default Post;
