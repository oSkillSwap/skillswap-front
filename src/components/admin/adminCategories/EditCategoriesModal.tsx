import { useState } from 'react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import api from '../../../services/api';

type Category = {
  id: number;
  name: string;
  icon: string;
};

type Props = {
  category: Category;
  onClose: () => void;
  onSuccess: (updated: Category) => void;
};

const iconMap = Icons as unknown as Record<string, LucideIcon>; // 🔥 FIX TS

const iconNames = Object.keys(iconMap).filter((name) => /^[A-Z]/.test(name));

function EditCategoryModal({ category, onClose, onSuccess }: Props) {
  const [name, setName] = useState(category.name);
  const [icon, setIcon] = useState(category.icon);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await api.patch(`/admin/category/${category.id}`, {
        name,
        icon,
      });
      onSuccess(res.data.category);
      onClose();
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Erreur modification catégorie', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const IconPreview = iconMap[icon] || Icons.HelpCircle;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Modifier la catégorie</h2>

        <label htmlFor="category-name">Nom</label>
        <input
          id="category-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="category-icon">Icône</label>
        <select
          id="category-icon"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        >
          {iconNames.map((iconName) => (
            <option key={iconName} value={iconName}>
              {iconName}
            </option>
          ))}
        </select>

        <div className="icon-preview">
          <IconPreview size={32} />
          <span>{icon}</span>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-alt" onClick={onClose}>
            Annuler
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCategoryModal;
