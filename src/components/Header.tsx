import {
  CirclePlus,
  Home,
  LogIn,
  LogOut,
  Mail,
  Menu,
  Search,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import './Header.scss';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuth();

  // Check if the screen is mobile size
  // and update the state accordingly
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    // to set the state based on the current screen size
    checkIfMobile();

    // Update the state on resize
    // to handle screen size changes
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when a link is clicked on mobile
  const handleLinkClick = () => {
    if (isMobile && isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <header className="header container">
      <div className="header-wrapper">
        <Link className="header-logo" to="/" onClick={handleLinkClick}>
          <Logo />
        </Link>

        {isMobile && (
          <button
            className="hamburger-btn"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
            type="button"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        )}

        <nav
          className={`${isMobile ? 'mobile-nav' : ''} ${
            isMenuOpen ? 'open' : ''
          }`}
        >
          <ul className="header-nav">
            <li className="header-nav-element">
              <Link
                className="header-nav-element-link"
                to="/"
                onClick={handleLinkClick}
              >
                {isMobile ? 'Accueil' : <Home />}
              </Link>
            </li>
            <li className="header-nav-element">
              <Link
                className="header-nav-element-link"
                to="/explore"
                onClick={handleLinkClick}
              >
                {isMobile ? 'Explorer' : <Search />}
              </Link>
            </li>

            {user && (
              <li className="header-nav-element">
                <Link
                  className="header-nav-element-link"
                  to="/post"
                  onClick={handleLinkClick}
                >
                  {isMobile ? 'Poster une annonce' : <CirclePlus />}
                </Link>
              </li>
            )}

            {user ? (
              <>
                <li className="header-nav-element">
                  <Link
                    className="header-nav-element-link"
                    to="/message"
                    onClick={handleLinkClick}
                  >
                    {isMobile ? 'Messages' : <Mail />}
                  </Link>
                </li>
                <li className="header-nav-element">
                  <div className="header-nav-element-user">
                    {!isMobile && (
                      <Link
                        className="header-nav-element-link header-nav-element-user-link"
                        to={'/profile'}
                      >
                        <img src={user.avatar} alt={user.username} />
                        {user.username}
                      </Link>
                    )}
                    <div className="header-nav-element-user-dropdown">
                      <div className="header-nav-element-user-dropdown-content">
                        <Link
                          className="header-nav-element-link"
                          to={'/profile'}
                          onClick={handleLinkClick}
                        >
                          Mon profil
                        </Link>
                        <Link
                          className="btn btn-reversed"
                          onClick={() => {
                            logout();
                            handleLinkClick();
                          }}
                          to={'/'}
                        >
                          Me déconnecter
                          <LogOut />
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <li className="header-nav-element">
                <Link
                  className="btn btn-reversed"
                  to="/login"
                  onClick={handleLinkClick}
                >
                  <LogIn />
                  S'identifier
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
