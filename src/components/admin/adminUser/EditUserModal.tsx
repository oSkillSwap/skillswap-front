import { useEffect, useState } from 'react';
import api from '../../../services/api';
import './EditUserModal.scss';

type Props = {
  userId: number;
  onClose: () => void;
  onSuccess: (updatedUser: User) => void;
};

type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  description: string;
  role: 'admin' | 'member';
  isAvailable: boolean;
  isBanned: boolean;
};

function EditUserModal({ userId, onClose, onSuccess }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/admin/users/${userId}`);
        setUser(res.data.user);
      } catch (err) {
        setError("Erreur lors du chargement de l'utilisateur.");
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error(err);
      }
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const res = await api.patch(`/admin/users/${userId}`, {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        description: user.description,
        role: user.role,
        isAvailable: user.isAvailable,
        isBanned: user.isBanned,
      });

      onSuccess(res.data.user);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la mise à jour.');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof User, value: string | boolean) => {
    if (!user) return;
    setUser({ ...user, [field]: value });
  };

  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Information de {user.username}</h2>
        {user.avatar && (
          <div className="user-avatar-preview">
            <img src={user.avatar} alt={`Avatar de ${user.username}`} />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            Pseudo
            <input
              value={user.username}
              onChange={(e) => updateField('username', e.target.value)}
            />
          </label>
          <label>
            Prénom
            <input
              value={user.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
            />
          </label>
          <label>
            Nom
            <input
              value={user.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              value={user.email}
              onChange={(e) => updateField('email', e.target.value)}
            />
          </label>
          <label>
            Avatar
            <input
              value={user.avatar}
              onChange={(e) => updateField('avatar', e.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              value={user.description}
              onChange={(e) => updateField('description', e.target.value)}
            />
          </label>
          <label>
            Rôle
            <select
              value={user.role}
              onChange={(e) => updateField('role', e.target.value)}
            >
              <option value="member">Membre</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <label>
            Disponible ?
            <input
              type="checkbox"
              checked={user.isAvailable}
              onChange={(e) => updateField('isAvailable', e.target.checked)}
            />
          </label>
          <label>
            Banni ?
            <input
              type="checkbox"
              checked={user.isBanned}
              onChange={(e) => updateField('isBanned', e.target.checked)}
            />
          </label>

          {error && <p className="error">{error}</p>}

          <div className="modal-actions">
            <button
              type="submit"
              className="btn btn-default"
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button type="button" className="btn btn-alt" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
