import { useState } from 'react';
import api from '../../../services/api';
import { X } from 'lucide-react';
//import './AddSkillModal.scss';

type AddSkillModalProps = {
  categoryId: number;
  onClose: () => void;
  onSuccess: (newSkill: { id: number; name: string }) => void;
};

function AddSkillModal({ categoryId, onClose, onSuccess }: AddSkillModalProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Le nom de la compétence est requis.');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/admin/skill', {
        name,
        category_id: categoryId,
      });
      onSuccess(res.data.skill);
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Erreur création compétence :', err);
      setError("Impossible d'ajouter la compétence.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button type="button" className="modal-close" onClick={onClose}>
          <X />
        </button>
        <h3>Ajouter une compétence</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nom de la compétence</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: React, Electricité, Anglais..."
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn btn-default" disabled={loading}>
            {loading ? 'Ajout en cours...' : 'Ajouter'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSkillModal;
