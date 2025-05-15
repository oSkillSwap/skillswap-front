import { Link, Outlet, useLocation, useParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import PageTransition from '../utils/PageTransition';
import './Profile.scss';
import { ArrowLeftRight, FileInput, FileText, User } from 'lucide-react';

function ProfileLayout() {
  const { userId } = useParams();
  const { user: connectedUser } = useAuth();
  const location = useLocation();

  const isOwnProfile = !userId || userId === connectedUser?.id?.toString();
  const basePath = userId ? `/profile/${userId}` : '/profile';

  const tabs = [
    { key: 'profile', path: '', label: 'Profil', icon: <User /> },
    { key: 'posts', path: 'posts', label: 'Mes annonces', icon: <FileText /> },
    {
      key: 'offers',
      path: 'offers',
      label: 'Mes propositions',
      icon: <FileInput />,
    },
    {
      key: 'exchanges',
      path: 'exchanges',
      label: 'Mes échanges',
      icon: <ArrowLeftRight />,
    },
  ];

  return (
    <>
      {isOwnProfile && (
        <nav className="container nav profile-tabs">
          {tabs.map((tab) => {
            const path = `${basePath}${tab.path ? `/${tab.path}` : ''}`;
            const isActive = location.pathname === path;

            return (
              <Link
                key={tab.key}
                to={tab.path}
                className={`btn btn-alt tab-btn ${isActive ? 'active' : ''}`}
              >
                {tab.icon}
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

export default PageTransition(ProfileLayout);
