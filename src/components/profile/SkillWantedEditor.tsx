import { Check, SquarePen, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import './SkillEditor.scss';
import api from '../../services/api';
import type User from '../../types/User';

interface Skill {
  id: number;
  name: string;
}

interface Props {
  skills: Skill[];
  isOwner: boolean;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
}

function normalizeString(str: string): string {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

function SkillWantedEditor({ skills, isOwner, setUserData }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>(skills);

  useEffect(() => {
    if (isEditing) {
      api.get('/skills').then((res) => setAllSkills(res.data.skills));
    }
  }, [isEditing]);

  useEffect(() => {
    const normalizedInput = normalizeString(inputValue);
    setFilteredSkills(
      allSkills.filter(
        (skill) =>
          normalizeString(skill.name).includes(normalizedInput) &&
          !selectedSkills.some((s) => s.id === skill.id),
      ),
    );
  }, [inputValue, allSkills, selectedSkills]);

  useEffect(() => {
    setSelectedSkills(skills);
  }, [skills]);

  const handleAddSkill = (skill: Skill) => {
    setSelectedSkills((prev) => [...prev, skill]);
    setInputValue('');
  };

  const handleRemoveSkill = (id: number) => {
    setSelectedSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = async () => {
    try {
      await api.put('/me/wanted-skills', {
        wantedSkills: selectedSkills.map((s) => s.id),
      });

      // Mise à jour visuelle immédiate
      setUserData((prev) =>
        prev ? { ...prev, WantedSkills: selectedSkills } : prev,
      );

      setIsEditing(false); // Ferme le mode édition
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Erreur lors de la mise à jour des intérêts :', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredSkills.length > 0) {
      e.preventDefault();
      handleAddSkill(filteredSkills[0]);
    }
  };

  return (
    <>
      {isOwner ? (
        isEditing ? (
          <>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Rechercher un intérêt"
              className="edit-input"
            />
            {inputValue && filteredSkills.length > 0 && (
              <ul className="autocomplete-list">
                {filteredSkills.map((skill) => (
                  <li key={skill.id} className="autocomplete-list-item">
                    <button
                      type="button"
                      onClick={() => handleAddSkill(skill)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleAddSkill(skill);
                        }
                      }}
                    >
                      {skill.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="selected-skill-list">
              {selectedSkills.map((skill) => (
                <span key={skill.id} className="tag selected">
                  {skill.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill.id)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="edit-btns">
              <button
                className="btn btn-icon btn-default"
                type="button"
                onClick={handleSave}
              >
                <Check size={18} />
              </button>
              <button
                type="button"
                className="btn btn-icon btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                <X size={18} />
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-icon btn-reversed"
              onClick={() => setIsEditing(true)}
            >
              <SquarePen size={18} /> Editer
            </button>
            <div className="profile-skills-list">
              {selectedSkills.length ? (
                selectedSkills.map((el) => (
                  <p key={el.name} className="tag">
                    {el.name}
                  </p>
                ))
              ) : (
                <p>Aucun intérêt renseigné</p>
              )}
            </div>
          </>
        )
      ) : (
        <div className="profile-skills-list">
          {selectedSkills.length ? (
            selectedSkills.map((el) => (
              <p key={el.name} className="tag">
                {el.name}
              </p>
            ))
          ) : (
            <p>Aucun intérêt renseigné</p>
          )}
        </div>
      )}
    </>
  );
}

export default SkillWantedEditor;
