import './ProfileHeaderEditor.scss';
import { Check, SquarePen, X } from 'lucide-react';
import { useState } from 'react';
import api from '../../services/api';
import type User from '../../types/User';

interface Props {
  value: string;
  field: 'username' | 'description';
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  className?: string;
  type?: 'input' | 'textarea';
  isOwner?: boolean;
}

function ProfileHeaderEditor({
  value,
  field,
  setUserData,
  className,
  type = 'input',
  isOwner = false,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSave = async () => {
    try {
      const res = await api.patch('/me', { [field]: editedValue });
      setUserData((prev) =>
        prev ? { ...prev, [field]: res.data.user[field] } : prev,
      );
      setIsEditing(false);
      setSuccessMessage('Modifié avec succès');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      console.error(`Erreur lors de la mise à jour du champ ${field} :`, err);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setEditedValue(value);
      setIsEditing(false);
    }

    if (type === 'textarea') {
      if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        handleSave();
      }
    } else {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSave();
      }
    }
  };

  if (!isOwner) {
    return type === 'textarea' ? (
      <p className="inline-edit-value">{value}</p>
    ) : (
      <h1 className="inline-edit-value">{value}</h1>
    );
  }

  return (
    <div className={`inline-edit ${className ?? ''}`}>
      {isEditing ? (
        <div className="edit-wrapper">
          {type === 'textarea' ? (
            <textarea
              className="edit-textarea"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <input
              className="edit-input"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          )}
          <div className="edit-btns">
            <button
              type="button"
              className="btn btn-default btn-icon"
              onClick={handleSave}
            >
              <Check size={18} />
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-icon"
              onClick={() => {
                setEditedValue(value);
                setIsEditing(false);
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <>
          {type === 'textarea' ? (
            <p className="inline-edit-value">
              {value ? value : 'Votre description'}
            </p>
          ) : (
            <h1 className="inline-edit-value">{value}</h1>
          )}
          <button
            type="button"
            className="btn btn-reversed btn-icon"
            onClick={() => setIsEditing(true)}
          >
            <SquarePen size={18} /> Editer
          </button>
        </>
      )}

      {successMessage && <span className="edit-success">{successMessage}</span>}
    </div>
  );
}

export default ProfileHeaderEditor;
