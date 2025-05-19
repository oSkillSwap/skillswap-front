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
              <Link className="footer-container-nav-element-link" to="/about">
                Qui sommes-nous ?
              </Link>
            </li>
            <li className="footer-container-nav-element">
              <Link className="footer-container-nav-element-link" to="/privacy">
                Politique de confidentialité
              </Link>
            </li>
            <li className="footer-container-nav-element">
              <Link className="footer-container-nav-element-link" to="/terms">
                Conditions d'utilisations
              </Link>
            </li>
            <li className="footer-container-nav-element">
              <Link className="footer-container-nav-element-link" to="/legals">
                Mentions légales
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
