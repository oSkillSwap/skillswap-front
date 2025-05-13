import { Link, Outlet, useLocation, useParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import PageTransition from '../utils/PageTransition';
import './Profile.scss';

function Profile() {
  const { userId } = useParams();
  const { user: connectedUser } = useAuth();
  const location = useLocation();

  const isOwnProfile = !userId || userId === connectedUser?.id?.toString();
  const basePath = userId ? `/profile/${userId}` : '/profile';

  const tabs = [
    { key: '', label: 'Profil' },
    { key: 'posts', label: 'Mes annonces' },
    { key: 'offers', label: 'Mes offres' },
    { key: 'exchanges', label: 'Mes échanges' },
  ];

  return (
    <>
      {isOwnProfile && (
        <nav className="container nav profile-tabs">
          {tabs.map((tab) => {
            const path = `${basePath}${tab.key ? `/${tab.key}` : ''}`;
            const isActive = location.pathname === path;

            return (
              <Link
                key={tab.key}
                to={path}
                className={`btn btn-alt tab-btn ${isActive ? 'active' : ''}`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      )}

      <Outlet />
    </>
  );
}

export default PageTransition(Profile);
