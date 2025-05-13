import { useState } from 'react';
import api from '../../services/api';
import './PropositionFormModal.scss';
import axios from 'axios';

type Props = {
  postId: number;
  onClose: () => void;
  onSuccess?: () => void;
};

function PropositionFormModal({ postId, onClose, onSuccess }: Props) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      setError('');
      if (!content.trim()) {
        return setError('Le message ne peut pas être vide.');
      }

      await api.post(`/me/propositions/${postId}`, { content });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Erreur lors de l'envoi.");
      } else {
        setError('Une erreur inattendue est survenue.');
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Envoyer une proposition</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Votre message"
        />
        {error && <p className="error">{error}</p>}
        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSubmit}
          >
            Envoyer
          </button>
          <button type="button" className="btn btn-alt" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropositionFormModal;
