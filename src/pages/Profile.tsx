import { Link, Outlet, useLocation, useParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import PageTransition from '../utils/PageTransition';
import './Profile.scss';

function Profile() {
  const { user: profileIdParam } = useParams();
  const { user: connectedUser } = useAuth();
  const location = useLocation();

  const isOwnProfile =
    profileIdParam === 'me' || connectedUser?.id?.toString() === profileIdParam;
  const actualProfileId =
    profileIdParam === 'me' ? connectedUser?.id?.toString() : profileIdParam;

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
            const path = `/profile/${profileIdParam}${tab.key ? `/${tab.key}` : ''}`;
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

      <Outlet context={{ profileId: actualProfileId }} />
    </>
  );
}

export default PageTransition(Profile);
