import { Globe } from 'lucide-react';
import PageTransition from '../../utils/PageTransition';
import './static.scss';

const LinkedinIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 432">
      <title>Linkedin</title>
      <path
        fill="currentColor"
        d="M319 221.5q-8-10.5-30-10.5q-27 0-38 16t-11 45v146q0 5-3 8t-8 3h-76q-4 0-7.5-3t-3.5-8V148q0-4 3.5-7.5t7.5-3.5h74q4 0 6.5 2t3.5 6v5q1 2 1 7q28-27 76-27q53 0 83 27t30 79v182q0 5-3.5 8t-7.5 3h-78q-4 0-7.5-3t-3.5-8V254q0-22-8-32.5zM88 91.5Q73 107 51.5 107T15 91.5t-15-37T15 18T51.5 3T88 18t15 36.5t-15 37zm13 56.5v270q0 5-3.5 8t-7.5 3H14q-5 0-8-3t-3-8V148q0-4 3-7.5t8-3.5h76q4 0 7.5 3.5t3.5 7.5z"
      />
    </svg>
  );
};
const GithubIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 416">
      <title>Github</title>
      <path
        fill="currentColor"
        d="M213.5 0q88.5 0 151 62.5T427 213q0 70-41 125.5T281 416q-14 2-14-11v-58q0-27-15-40q44-5 70.5-27t26.5-77q0-34-22-58q11-26-2-57q-18-5-58 22q-26-7-54-7t-53 7q-18-12-32.5-17.5T107 88h-6q-12 31-2 57q-22 24-22 58q0 55 27 77t70 27q-11 10-13 29q-42 18-62-18q-12-20-33-22q-2 0-4.5.5t-5 3.5t8.5 9q14 7 23 31q1 2 2 4.5t6.5 9.5t13 10.5T130 371t30-2v36q0 13-14 11q-64-22-105-77.5T0 213q0-88 62.5-150.5T213.5 0z"
      />
    </svg>
  );
};

function About() {
  return (
    <main className="static container">
      <section className="content">
        <h1>L'équipe</h1>
        <p className="prom">Promotion O'Clock DWWM - Samoussas</p>
        <div className="team">
          <section>
            <img
              src="https://avatars.githubusercontent.com/renardoli"
              alt="Olivier Renard"
            />
            <div className="info">
              <h2>Olivier Renard</h2>
              <p>Product Owner</p>
              <div className="socials">
                <a
                  className="btn btn-icon btn-alt"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.olivier-renard.com"
                >
                  <Globe />
                </a>
                <a
                  className="btn btn-icon btn-alt"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/renard-olivier"
                >
                  <LinkedinIcon />
                </a>
                <a
                  className="btn btn-icon btn-alt"
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/renardoli"
                >
                  <GithubIcon />
                </a>
              </div>
            </div>
          </section>
          <section>
            <img
              src="https://avatars.githubusercontent.com/gregv74"
              alt="Gregory Virmaud"
            />
            <div className="info">
              <h2>Gregory Virmaud</h2>
              <p>Scrum Master</p>
              <div className="socials">
                <a
                  className="btn btn-icon btn-alt"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/gregory-virmaud-65833487"
                >
                  <LinkedinIcon />
                </a>
                <a
                  className="btn btn-icon btn-alt"
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/gregv74"
                >
                  <GithubIcon />
                </a>
              </div>
            </div>
          </section>
          <section>
            <img
              src="https://avatars.githubusercontent.com/ErwanMettouchi"
              alt="Erwan Mettouchi"
            />
            <div className="info">
              <h2>Erwan Mettouchi</h2>
              <p>Lead Dev</p>
              <div className="socials">
                <a
                  className="btn btn-icon btn-alt"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/erwan-mettouchi-390516181"
                >
                  <LinkedinIcon />
                </a>
                <a
                  className="btn btn-icon btn-alt"
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/ErwanMettouchi"
                >
                  <GithubIcon />
                </a>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default PageTransition(About);
