import { useState } from 'react';
import api from '../../services/api';
import type User from '../../types/User';

interface Props {
  isAvailable: boolean;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  isOwner?: boolean;
}

function IsAvailableToggle({
  isAvailable,
  setUserData,
  isOwner = false,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setLoading(true);
      const res = await api.patch('/me', {
        isAvailable: !isAvailable,
      });
      setUserData((prev) =>
        prev ? { ...prev, isAvailable: res.data.user.isAvailable } : prev,
      );
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Erreur lors du changement de disponibilité', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOwner) {
    return (
      <p className={`tag ${isAvailable ? 'tag-primary' : 'tag-alt'}`}>
        {isAvailable ? 'Disponible' : 'Indisponible'}
      </p>
    );
  }

  return (
    <button
      type="button"
      className={`tag ${isAvailable ? 'tag-primary' : 'tag-alt'}`}
      onClick={handleToggle}
      disabled={loading}
    >
      {loading ? 'Changement...' : isAvailable ? 'Disponible' : 'Indisponible'}
    </button>
  );
}

export default IsAvailableToggle;
