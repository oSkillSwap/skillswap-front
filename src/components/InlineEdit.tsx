// src/components/InlineEdit.tsx
import './InlineEdit.scss';
import { useState } from 'react';
import { Edit3, Check, X } from 'lucide-react';
interface InlineEditProps {
  value: string;
  onSave: (newValue: string) => Promise<void>;
  className?: string;
  type?: 'input' | 'textarea';
}

function InlineEdit({
  value,
  onSave,
  className,
  type = 'input',
}: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleSave = async () => {
    try {
      await onSave(editedValue);
      setIsEditing(false);
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Erreur de sauvegarde :', err);
    }
  };

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

export default InlineEdit;
