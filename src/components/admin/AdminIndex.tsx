import { useEffect, useState } from 'react';
import api from '../../services/api';

type AdminDashboard = {
  message: string;
  stats: {
    totalUsers: number;
    totalPosts: number;
    totalCategories: number;
  };
  recent: {
    users: { id: number; username: string }[];
    posts: { id: number; title: string }[];
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
    <div className="container">
      <h2>{dashboard.message}</h2>
      <p>Total utilisateurs : {dashboard.stats.totalUsers}</p>
      <p>Total annonces : {dashboard.stats.totalPosts}</p>
      <p>Total catégories : {dashboard.stats.totalCategories}</p>

      <h3>Derniers utilisateurs :</h3>
      {dashboard.recent.users.length > 0 ? (
        <ul>
          {dashboard.recent.users.map((u) => (
            <li key={u.id}>{u.username}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun utilisateur récent.</p>
      )}

      <h3>Dernières annonces :</h3>
      {dashboard.recent.posts.length > 0 ? (
        <ul>
          {dashboard.recent.posts.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      ) : (
        <p>Aucune annonce récente.</p>
      )}
    </div>
  );
}

export default AdminIndex;
