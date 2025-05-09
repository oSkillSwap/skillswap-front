import './ProfileHeaderEditor.scss';
import { useState } from 'react';
import { Edit3, Check, X } from 'lucide-react';
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

  const handleSave = async () => {
    try {
      const res = await api.patch('/me', { [field]: editedValue });
      setUserData((prev) =>
        prev ? { ...prev, [field]: res.data.user[field] } : prev,
      );
      setIsEditing(false);
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(`Erreur lors de la mise à jour du champ ${field} :`, err);
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
        <>
          {type === 'textarea' ? (
            <textarea
              className="edit-textarea"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
            />
          ) : (
            <input
              className="edit-input"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
            />
          )}
          <button type="button" className="btn-icon" onClick={handleSave}>
            <Check size={18} />
          </button>
          <button
            type="button"
            className="btn-icon"
            onClick={() => setIsEditing(false)}
          >
            <X size={18} />
          </button>
        </>
      ) : (
        <>
          {type === 'textarea' ? (
            <p className="inline-edit-value">{value}</p>
          ) : (
            <h1 className="inline-edit-value">{value}</h1>
          )}
          <button
            type="button"
            className="btn-icon"
            onClick={() => setIsEditing(true)}
          >
            <Edit3 size={18} />
          </button>
        </>
      )}
    </div>
  );
}

export default ProfileHeaderEditor;
