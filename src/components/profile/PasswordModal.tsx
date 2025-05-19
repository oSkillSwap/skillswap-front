import { useEffect, useRef, useState } from 'react';
import './PasswordModal.scss';
import axios, { type AxiosError } from 'axios';
import api from '../../services/api';
import ErrorToast from '../ErrorToast';

interface ApiErrorResponse {
  message?: string;
  errors?: {
    fieldErrors?: {
      currentPassword?: string[];
      newPassword?: string[];
      confirmPassword?: string[];
    };
  };
}

interface Props {
  onClose: () => void;
  onSuccess: (message: string) => void;
}

function PasswordModal({ onClose, onSuccess }: Props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string | string[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async () => {
    setErrors(null);
    try {
      await api.patch('/me/password', {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      onSuccess('Mot de passe mis à jour avec succès.');
      onClose();
    } catch (error) {
      if (newPassword !== confirmPassword) {
        return setErrors('Les mots de passe ne correspondent pas');
      }

      // Vérifier si l'erreur est une erreur Axios
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        if (axiosError.response?.data) {
          const errorData = axiosError.response.data;

          if (errorData.errors?.fieldErrors?.currentPassword) {
            return setErrors('Mot de passe actuel incorrect');
          }

          if (errorData.errors?.fieldErrors?.newPassword) {
            setErrors(errorData.errors.fieldErrors.newPassword);
          } else if (errorData.message) {
            setErrors([errorData.message]);
          } else {
            setErrors(['Une erreur est survenue']);
          }
        } else {
          setErrors(['Erreur de connexion']);
        }
      } else {
        // Gérer les erreurs non-Axios
        setErrors(['Une erreur inattendue est survenue']);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Changer le mot de passe</h2>
        <label>
          Mot de passe actuel
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            ref={inputRef}
          />
        </label>
        <label>
          Nouveau mot de passe
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label>
          Confirmation
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        {errors && <ErrorToast errors={errors} />}

        <div className="modal-buttons">
          <button
            type="button"
            className="btn btn-default"
            onClick={handleSubmit}
          >
            Enregistrer
          </button>
          <button type="button" className="btn btn-alt" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
