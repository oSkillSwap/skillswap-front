import { useEffect, useState } from 'react';
import api from '../../../services/api';
import './AdminUserIndex.scss';
import { Pencil, Trash2 } from 'lucide-react';
import EditUserModal from './EditUserModal';

type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  description: string;
  avatar: string;
  role: 'admin' | 'member';
  isBanned: boolean;
  isAvailable: boolean;
  createdAt: string;
};

function AdminUserIndex() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/admin/users');
        setUsers(res.data.users);
      } catch (err) {
        setError('Erreur lors du chargement des utilisateurs');
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
  };

  return (
    <div className="container admin-users">
      <h2>Gestion des utilisateurs</h2>
      {error && <p className="error">{error}</p>}

      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Pseudo</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Disponible</th>
            <th>Date d'inscription</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="avatar-username-cell">
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt={`Avatar de ${user.username}`}
                    className="avatar-mini"
                  />
                )}
                {user.username}
              </td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isBanned ? 'Banni' : 'Actif'}</td>
              <td>{user.isAvailable ? 'Oui' : 'Non'}</td>
              <td>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</td>
              <td>
                <button
                  type="button"
                  title="Modifier"
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <Pencil size={16} />
                </button>
                <button type="button" title="Supprimer">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUserId && (
        <EditUserModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
          onSuccess={(updated) => {
            const original = users.find((u) => u.id === updated.id);
            handleUpdate({
              ...updated,
              createdAt: original?.createdAt ?? new Date().toISOString(),
            });
            setSelectedUserId(null);
          }}
        />
      )}
    </div>
  );
}

export default AdminUserIndex;
