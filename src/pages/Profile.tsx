import { Heart, MessageSquare, Send, Star } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Profile.scss';

function Profile() {
  return (
    <>
      <Header />

      <main className="profile container">
        <section className="profile-header">
          <img
            className="profile-header-picture"
            src="img/avatars/robot1.jpg"
            alt=""
          />
          <div className="profile-header-content">
            <div>
              <div className="profile-header-content-title">
                <h1>OtherUser</h1>
                <p className="tag tag-primary">Disponnible</p>
              </div>
              <div className="profile-header-content-grade">
                <div className="profile-header-content-grade-stars">
                  <Star className="star star-active" />
                  <Star className="star star-active" />
                  <Star className="star star-active" />
                  <Star className="star star-active" />
                  <Star className="star" />
                </div>
                <p className="profile-header-content-grade-nbreviews">
                  (3 avis)
                </p>
              </div>
            </div>
            <p>
              J'aide volontiers à réparer vos appareils du quotidien. En
              échange, je cherche à mieux maîtriser les outils bureautiques et
              le montage vidéo.
            </p>
            <div className="profile-header-content-btns">
              <button className="btn btn-default">
                <MessageSquare />
                Contacter
              </button>
              <button className="btn btn-alt btn-icon">
                <Heart />
              </button>
            </div>
          </div>
        </section>

        <div className="profile-col1">
          <section className="profile-skills">
            <h2>Compétences</h2>
            <p className="tag">REACT</p>
            <p className="tag">Typescript</p>
            <p className="tag">Next.js</p>
            <p className="tag">Next.js</p>
            <p className="tag">Next.js</p>
          </section>
          <section className="profile-interests">
            <h2>Intérêts</h2>
            <p className="tag">Angular</p>
            <p className="tag">Python</p>
            <p className="tag">Typescript</p>
          </section>
          <section className="profile-fav">
            <h2>Favoris</h2>
            <img
              className="profile-fav-picture"
              src="img/avatars/robot1.jpg"
              alt=""
            />
            <img
              className="profile-fav-picture"
              src="img/avatars/robot1.jpg"
              alt=""
            />
            <img
              className="profile-fav-picture"
              src="img/avatars/robot1.jpg"
              alt=""
            />
            <img
              className="profile-fav-picture"
              src="img/avatars/robot1.jpg"
              alt=""
            />
            <img
              className="profile-fav-picture"
              src="img/avatars/robot1.jpg"
              alt=""
            />
            <img
              className="profile-fav-picture"
              src="img/avatars/robot1.jpg"
              alt=""
            />
          </section>
        </div>
        <div className="profile-col2">
          <section className="profile-availabilities">
            <h2>Disponibilités</h2>
            <div class="profile-availability">
              <div></div>
              <div class="profile-availability-day">Lun</div>
              <div class="profile-availability-day">Mar</div>
              <div class="profile-availability-day">Mer</div>
              <div class="profile-availability-day">Jeu</div>
              <div class="profile-availability-day">Ven</div>
              <div class="profile-availability-day">Sam</div>
              <div class="profile-availability-day">Dim</div>

              <div class="profile-availability-slot">Matin</div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check"></div>

              <div class="profile-availability-slot">Midi</div>
              <div class="profile-availability-check active"></div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check active"></div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check"></div>

              <div class="profile-availability-slot">Après-midi</div>
              <div class="profile-availability-check active"></div>
              <div class="profile-availability-check active"></div>
              <div class="profile-availability-check active"></div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check active"></div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check"></div>

              <div class="profile-availability-slot">Soir</div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check active"></div>
              <div class="profile-availability-check active"></div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check"></div>
              <div class="profile-availability-check"></div>
            </div>
          </section>

          <section className="profile-posts">
            <h2>Annonces</h2>
            <div className="posts-container">
              <article className="post">
                <div>
                  <div className="post-title">
                    <h3>Titre de l'annonce</h3>
                    <p className="tag">Next.js</p>
                  </div>
                  <p className="post-info">Posté le 24 avril 2025</p>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia molestias perferendis quisquam omnis quaerat cum harum
                  ullam! Mollitia harum perspiciatis eius totam quaerat aliquid
                  in, impedit quasi ipsam incidunt esse.
                </p>
                <div className="post-btns">
                  <button className="btn btn-default">
                    <Send />
                    Proposer
                  </button>
                  <button className="btn btn-alt">Voir l'annonce</button>
                </div>
              </article>
              <article className="post">
                <div>
                  <div className="post-title">
                    <h3>Titre de l'annonce</h3>
                    <p className="tag">Next.js</p>
                  </div>
                  <p className="post-info">Posté le 24 avril 2025</p>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia molestias perferendis quisquam omnis quaerat cum harum
                  ullam! Mollitia harum perspiciatis eius totam quaerat aliquid
                  in, impedit quasi ipsam incidunt esse.
                </p>
                <div className="post-btns">
                  <button className="btn btn-default">
                    <Send />
                    Proposer
                  </button>
                  <button className="btn btn-alt">Voir l'annonce</button>
                </div>
              </article>
            </div>
          </section>

          <section className="profile-testimonials">
            <h2>Avis</h2>
            <div className="testimonials">
              <article className="testimonials-card">
                <img
                  className="testimonials-card-picture"
                  src="img/avatars/robot1.jpg"
                  alt=""
                />
                <div className="testimonials-card-title">
                  <h3>Vraiment génial !</h3>
                  <div className="testimonials-card-grade">
                    <Star className="star star-active" />
                    <Star className="star star-active" />
                    <Star className="star star-active" />
                    <Star className="star star-active" />
                    <Star className="star" />
                  </div>
                </div>
                <p className="testimonials-card-comment">
                  J'ai échangé mes compétences en graphisme contre des cours de
                  guitare, et c'était une expérience incroyable. Simple, humain,
                  et tellement enrichissant !
                </p>
                <p className="testimonials-card-info">
                  Username, le 22 avril 2025
                </p>
              </article>
              <article className="testimonials-card">
                <img
                  className="testimonials-card-picture"
                  src="img/avatars/robot1.jpg"
                  alt=""
                />
                <div className="testimonials-card-title">
                  <h3>Vraiment génial !</h3>
                  <div className="testimonials-card-grade">
                    <Star className="star star-active" />
                    <Star className="star star-active" />
                    <Star className="star star-active" />
                    <Star className="star star-active" />
                    <Star className="star" />
                  </div>
                </div>
                <p className="testimonials-card-comment">
                  J'ai échangé mes compétences en graphisme contre des cours de
                  guitare, et c'était une expérience incroyable. Simple, humain,
                  et tellement enrichissant !
                </p>
                <p className="testimonials-card-info">
                  Username, le 22 avril 2025
                </p>
              </article>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Profile;
