import { useState } from 'react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import api from '../../../services/api';
import './AddCategoryModal.scss';

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

const iconMap = Icons as unknown as Record<string, LucideIcon>;
const iconNames = Object.keys(iconMap).filter((key) => /^[A-Z]/.test(key));

function AddCategoryModal({ onClose, onSuccess }: Props) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('BookOpen');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/category', { name, icon });
      onSuccess();
      onClose();
    } catch (err) {
      setError("Erreur lors de l'ajout de la catégorie");
      console.error(err);
    }
  };

  const SelectedIcon = iconMap[icon] || iconMap.HelpCircle;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Ajouter une catégorie</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nom de la catégorie
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Icône
            <div className="icon-preview-row">
              <SelectedIcon size={24} />
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                required
              >
                {iconNames.map((name) => {
                  //const Icon = iconMap[name];
                  return (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>
          </label>

          {error && <p className="error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-alt" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn-default">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategoryModal;
