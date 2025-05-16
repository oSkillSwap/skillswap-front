import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router';
import { Outlet } from 'react-router';
import './AdminIndex.scss';
import {
  ShieldCheck,
  User,
  FileText,
  LayoutGrid,
  UserPlus,
  Megaphone,
} from 'lucide-react';

type AdminDashboard = {
  message: string;
  stats: {
    totalUsers: number;
    totalPosts: number;
    totalCategories: number;
  };
  recent: {
    users: {
      id: number;
      username: string;
      createdAt: string;
    }[];
    posts: {
      id: number;
      title: string;
      createdAt: string;
      Author?: {
        id: number;
        username: string;
      };
    }[];
  };
};

function AdminIndex() {
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        setDashboard(res.data);
      } catch (err: unknown) {
        if (err && typeof err === 'object' && 'response' in err) {
          const error = err as {
            response?: { data?: unknown };
            message?: string;
          };
          // biome-ignore lint/suspicious/noConsole: <explanation>
          console.error(
            'Erreur admin :',
            error.response?.data || error.message || error,
          );
        } else {
          // biome-ignore lint/suspicious/noConsole: <explanation>
          console.error('Erreur inconnue :', err);
        }
        setError('Impossible de charger les données admin.');
      }
    };

    fetchDashboard();
  }, []);

  if (error) return <div className="container">{error}</div>;
  if (!dashboard) return <div className="container">Chargement...</div>;

  const { stats, recent } = dashboard;

  return (
    <div className="admin-dashboard container">
      <h2>
        <ShieldCheck />
        Tableau de bord
      </h2>

      <div className="admin-dashboard-cards">
        <Link to="users" className="card">
          <div className="label">
            <User />
            Gérer les utilisateurs
          </div>
          <div className="value">{stats.totalUsers} membres</div>
        </Link>

        <Link to="posts" className="card">
          <div className="label">
            <FileText />
            Gérer les annonces
          </div>
          <div className="value">{stats.totalPosts} annonces</div>
        </Link>

        <Link to="categories" className="card">
          <div className="label">
            <LayoutGrid />
            Gérer les catégories
          </div>
          <div className="value">{stats.totalCategories} catégories</div>
        </Link>
      </div>

      <div className="admin-dashboard-lists">
        <div className="list">
          <h3>
            <UserPlus />
            Derniers utilisateurs inscrits
          </h3>
          <ul>
            {recent.users.map((user) => (
              <li key={user.id}>
                <span>{user.username}</span>
                <time>
                  {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                </time>
              </li>
            ))}
          </ul>
        </div>

        <div className="list">
          <h3>
            <Megaphone />
            Dernières annonces postées
          </h3>
          <ul>
            {recent.posts.map((post) => (
              <li key={post.id}>
                <span>{post.title}</span>
                <small>
                  {post.Author?.username ? (
                    <>
                      par {post.Author.username} le{' '}
                      {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                    </>
                  ) : (
                    <>
                      Utilisateur inconnu —{' '}
                      {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                    </>
                  )}
                </small>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminIndex;
