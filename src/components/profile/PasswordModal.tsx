import { useState } from 'react';
import './PasswordModal.scss';
import api from '../../services/api';

interface Props {
  onClose: () => void;
  onSuccess: (message: string) => void;
}

function PasswordModal({ onClose, onSuccess }: Props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await api.patch('/me/password', {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      onSuccess('Mot de passe mis à jour avec succès.');
      onClose();
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Erreur lors du changement de mot de passe :', error);
      alert(
        `Erreur : ${
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || 'Erreur inconnue'
        }`,
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Changer le mot de passe</h2>
        <label>
          Mot de passe actuel
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        <label>
          Nouveau mot de passe
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label>
          Confirmation
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <div className="modal-buttons">
          <button
            type="button"
            className="btn btn-default"
            onClick={handleSubmit}
          >
            Enregistrer
          </button>
          <button type="button" className="btn btn-alt" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
