import { useEffect, useState } from 'react';
import api from '../../../services/api';

type Skill = {
  id: number;
  name: string;
  category_id: number;
};

type Category = {
  id: number;
  name: string;
};

type Props = {
  skill: Skill;
  categories: Category[];
  onClose: () => void;
  onSuccess: (updatedSkill: Skill) => void;
};

function EditSkillModal({ skill, categories, onClose, onSuccess }: Props) {
  const [name, setName] = useState(skill.name);
  const [categoryId, setCategoryId] = useState(skill.category_id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(skill.name);
    setCategoryId(skill.category_id);
  }, [skill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.patch(`/admin/skills/${skill.id}`, {
        name,
        category_id: categoryId,
      });
      onSuccess(res.data.skill);
      onClose();
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Erreur lors de la mise à jour de la compétence', err);
      setError('Erreur lors de la mise à jour.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Modifier la compétence</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="edit-skill-name">
            Nom
            <input
              id="edit-skill-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label htmlFor="edit-skill-category">
            Catégorie
            <select
              id="edit-skill-category"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>

          {error && <p className="error">{error}</p>}

          <div className="modal-actions">
            <button
              type="submit"
              className={`btn btn-default ${loading ? 'is-loading' : ''}`}
            >
              Enregistrer
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

export default EditSkillModal;
