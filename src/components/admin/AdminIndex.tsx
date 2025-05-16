import { useEffect, useState } from 'react';
import api from '../../services/api';
import './AdminIndex.scss';
import { ShieldCheck, User, FileText, LayoutGrid } from 'lucide-react';

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
      author?: {
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
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.log('Dashboard reçu :', res.data);
        setDashboard(res.data);
      } catch (err: unknown) {
        if (err && typeof err === 'object' && 'response' in err) {
          const error = err as {
            response?: { data?: unknown };
            message?: string;
          };
          // biome-ignore lint/suspicious/noConsole: <explanation>
          console.error(
            'Erreur complète :',
            error.response?.data || error.message || error,
          );
          setError('Impossible de charger les données admin.');
        } else {
          // biome-ignore lint/suspicious/noConsole: <explanation>
          console.error('Erreur inconnue :', err);
          setError('Une erreur est survenue.');
        }
      }
    };

    fetchDashboard();
  }, []);

  if (error) return <div className="container">{error}</div>;
  if (!dashboard) return <div className="container">Chargement...</div>;

  return (
    <div className="admin-dashboard container">
      <h2 className="title-admin-pannel-dashboard">
        <ShieldCheck /> Tableau de bord
      </h2>

      <div className="admin-dashboard-cards">
        <div className="card">
          <div className="label">
            <User /> Gérer les utilisateurs
          </div>
          <div className="value">{dashboard.stats.totalUsers} Membres</div>
        </div>
        <div className="card">
          <div className="label">
            <FileText /> Gérer les annonces
          </div>
          <div className="value">{dashboard.stats.totalPosts} Annonces</div>
        </div>
        <div className="card">
          <div className="label">
            <LayoutGrid /> Gérer les catégories
          </div>
          <div className="value">
            {dashboard.stats.totalCategories} Catégories
          </div>
        </div>
      </div>

      <div className="admin-dashboard-lists">
        <div className="list">
          <h3>
            <User /> Derniers utilisateurs inscrits
          </h3>
          <ul>
            {dashboard.recent.users.map((u) => (
              <li key={u.id}>
                <span>{u.username}</span>
                <span>{new Date(u.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="list">
          <h3>
            <FileText /> Dernières annonces postées
          </h3>
          <ul>
            {dashboard.recent.posts.map((p) => (
              <li key={p.id}>
                <span>{p.title}</span>
                <span className="author">
                  {p.author?.username ? (
                    <>
                      par {p.author.username} —{' '}
                      {new Date(p.createdAt).toLocaleDateString('fr-FR')}
                    </>
                  ) : (
                    <>Annonce sans auteur</>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminIndex;
