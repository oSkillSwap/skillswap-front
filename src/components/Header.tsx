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
import { Link, NavLink } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
              <NavLink
                className="header-nav-element-link"
                to="/"
                onClick={handleLinkClick}
              >
                {isMobile ? 'Accueil' : <Home />}
              </NavLink>
            </li>
            <li className="header-nav-element">
              <NavLink
                className="header-nav-element-link"
                to="/explore"
                onClick={handleLinkClick}
              >
                {isMobile ? 'Explorer' : <Search />}
              </NavLink>
            </li>

            {user && (
              <li className="header-nav-element">
                <NavLink
                  className="header-nav-element-link"
                  to="/post"
                  onClick={handleLinkClick}
                >
                  {isMobile ? 'Poster une annonce' : <CirclePlus />}
                </NavLink>
              </li>
            )}

            {user ? (
              <>
                <li className="header-nav-element">
                  <NavLink
                    className="header-nav-element-link"
                    to="/message"
                    onClick={handleLinkClick}
                  >
                    {isMobile ? 'Messages' : <Mail />}
                  </NavLink>
                </li>
                <li className="header-nav-element">
                  <div className="header-nav-element-user">
                    {!isMobile && (
                      <NavLink
                        className="header-nav-element-link header-nav-element-user-link"
                        to="/profile"
                        onClick={handleLinkClick}
                      >
                        <img
                          src={
                            user.avatar.startsWith('http')
                              ? user.avatar
                              : `${import.meta.env.VITE_API_URL.replace(/\/api$/, '')}${user.avatar}`
                          }
                          alt={user.username}
                        />
                        {user.username}
                      </NavLink>
                    )}
                    <div className="header-nav-element-user-dropdown">
                      <div className="header-nav-element-user-dropdown-content">
                        <Link
                          className="header-nav-element-link"
                          to="/profile"
                          onClick={handleLinkClick}
                        >
                          Mon profil
                        </Link>
                        <Link
                          className="header-nav-element-link"
                          to={'/profile/posts'}
                          onClick={handleLinkClick}
                        >
                          Mes annonces
                        </Link>
                        <Link
                          className="header-nav-element-link"
                          to={'/profile/offers'}
                          onClick={handleLinkClick}
                        >
                          Mes propositions
                        </Link>
                        <Link
                          className="header-nav-element-link"
                          to={'/profile/exchanges'}
                          onClick={handleLinkClick}
                        >
                          Mes échanges
                        </Link>
                        <Link
                          className="btn btn-reversed"
                          onClick={() => {
                            logout();
                            handleLinkClick();
                          }}
                          to="/"
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
