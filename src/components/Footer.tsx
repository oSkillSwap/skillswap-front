import { Link } from 'react-router';
import './Footer.scss';
import Logo from './Logo';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <Link to="/" className="footer-container-logo">
          <Logo />
        </Link>
        <nav>
          <ul className="footer-container-nav">
            <li className="footer-container-nav-element">
              <Link className="footer-container-nav-element-link" to="/">
                Qui sommes-nous ?
              </Link>
            </li>
            <li className="footer-container-nav-element">
              <Link className="footer-container-nav-element-link" to="/">
                FAQ
              </Link>
            </li>
            <li className="footer-container-nav-element">
              <Link className="footer-container-nav-element-link" to="/">
                Données personnelles
              </Link>
            </li>
            <li className="footer-container-nav-element">
              <Link className="footer-container-nav-element-link" to="/">
                Conditions d'utilisations
              </Link>
            </li>
            <li className="footer-container-nav-element">
              <Link className="footer-container-nav-element-link" to="/">
                Mentions légales
              </Link>
            </li>
            <li className="footer-container-nav-element">
              <Link className="footer-container-nav-element-link" to="/">
                Nous contacter
              </Link>
            </li>
          </ul>
        </nav>
        <div className="footer-container-copy">
          <p>© 2025 SKILLSWAP</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
