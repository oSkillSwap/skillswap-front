import { useEffect, useState } from 'react';
import api from '../../../services/api';
import './AdminCategoriesIndex.scss';
import AddSkillModal from './AddSkillModal';
import AddCategoryModal from './AddCategoryModal';

import type { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { PlusCircle, Trash2, Pencil } from 'lucide-react';

import EditCategoryModal from './EditCategoriesModal';
import DeleteCategoryConfirmModal from './DeleteCategoryConfirmModal';
import DeleteSkillConfirmModal from './DeleteSkillConfirmModal';
import EditSkillModal from './EditSkillModal';

type Skill = {
  id: number;
  name: string;
  category_id: number;
};

type Category = {
  id: number;
  name: string;
  icon: string;
  skills?: Skill[];
  Skills?: Skill[];
};

const iconMap = Icons as unknown as Record<string, LucideIcon>;

function AdminCategoriesIndex() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);

  const [categoryToAddSkill, setCategoryToAddSkill] = useState<Category | null>(
    null,
  );
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/admin/category');
        const rawCategories = res.data.categories ?? [];

        const enrichedCategories = rawCategories.map((cat: Category) => ({
          ...cat,
          skills: (cat.skills ?? cat.Skills ?? []).map((skill) => ({
            ...skill,
            category_id: cat.id,
          })),
        }));

        setCategories(enrichedCategories);
      } catch (err) {
        setError('Erreur lors du chargement des catégories.');
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const handleUpdate = (updated: Category) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c)),
    );
  };

  const handleDelete = (deletedId: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== deletedId));
  };

  if (error) return <div className="container">{error}</div>;
  if (!Array.isArray(categories) || categories.length === 0) {
    return <div className="container">Chargement...</div>;
  }

  return (
    <div className="container admin-categories">
      <div className="admin-categories-header">
        <h2>Gestion des catégories</h2>
        <button
          type="button"
          className="btn btn-default"
          onClick={() => setShowAddModal(true)}
        >
          <PlusCircle />
          Ajouter une catégorie
        </button>
      </div>

      <div className="admin-categories-list">
        {categories.map((category) => {
          const Icon = iconMap[category.icon] || Pencil;

          return (
            <div key={category.id} className="category-card">
              <div className="category-header">
                <Icon />
                <h3>{category.name}</h3>
                <div className="category-actions">
                  <button
                    type="button"
                    onClick={() => setCategoryToEdit(category)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategoryToDelete(category)}
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    type="button"
                    title="Ajouter une compétence"
                    onClick={() => setCategoryToAddSkill(category)}
                  >
                    <PlusCircle size={18} />
                  </button>
                </div>
              </div>

              <ul className="skills-list">
                {(category.skills ?? category.Skills)?.map((skill) => (
                  <li key={skill.id}>
                    {skill.name}
                    <div className="skill-actions">
                      <button
                        type="button"
                        onClick={() => setSkillToEdit(skill)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSkillToDelete(skill)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Modales */}
      {categoryToEdit && (
        <EditCategoryModal
          category={categoryToEdit}
          onClose={() => setCategoryToEdit(null)}
          onSuccess={(updated) => {
            handleUpdate(updated);
            setCategoryToEdit(null);
          }}
        />
      )}

      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            // Reload categories after save
            api.get('/admin/category').then((res) => {
              setCategories(res.data.categories ?? []);
            });
          }}
        />
      )}

      {categoryToDelete && (
        <DeleteCategoryConfirmModal
          category={categoryToDelete}
          onClose={() => setCategoryToDelete(null)}
          onDeleteSuccess={(deletedId) => {
            handleDelete(deletedId);
            setCategoryToDelete(null);
          }}
        />
      )}

      {categoryToAddSkill && (
        <AddSkillModal
          categoryId={categoryToAddSkill.id}
          onClose={() => setCategoryToAddSkill(null)}
          onSuccess={(newSkill) => {
            const skillWithCategory: Skill = {
              ...newSkill,
              category_id: categoryToAddSkill.id,
            };

            setCategories((prev) =>
              prev.map((cat) =>
                cat.id === categoryToAddSkill.id
                  ? {
                      ...cat,
                      skills: [
                        ...(cat.skills ?? cat.Skills ?? []),
                        skillWithCategory,
                      ],
                    }
                  : cat,
              ),
            );
            setCategoryToAddSkill(null);
          }}
        />
      )}

      {/* Edit Skill Categories Modals */}
      {skillToEdit && (
        <EditSkillModal
          skill={skillToEdit}
          categories={categories}
          onClose={() => setSkillToEdit(null)}
          onSuccess={(updatedSkill) => {
            setCategories((prev) =>
              prev.map((cat) => {
                if (cat.id !== updatedSkill.category_id) return cat;
                return {
                  ...cat,
                  skills: (cat.skills ?? cat.Skills)?.map((s) =>
                    s.id === updatedSkill.id ? updatedSkill : s,
                  ),
                };
              }),
            );
            setSkillToEdit(null);
          }}
        />
      )}

      {/* Delete Skill Modal */}
      {skillToDelete && (
        <DeleteSkillConfirmModal
          skillName={skillToDelete.name}
          onClose={() => setSkillToDelete(null)}
          onConfirm={async () => {
            try {
              await api.delete(`/admin/skills/${skillToDelete.id}`);
              setCategories((prev) =>
                prev.map((cat) =>
                  cat.id === skillToDelete.category_id
                    ? {
                        ...cat,
                        skills: (cat.skills ?? cat.Skills)?.filter(
                          (s) => s.id !== skillToDelete.id,
                        ),
                      }
                    : cat,
                ),
              );
            } catch (err) {
              console.error('Erreur lors de la suppression', err);
            } finally {
              setSkillToDelete(null);
            }
          }}
        />
      )}
    </div>
  );
}

export default AdminCategoriesIndex;
