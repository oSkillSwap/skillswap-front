import { useState } from 'react';
import type { FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router';
import api from '../services/api';
import type { AxiosError } from 'axios';
import FlashMessage from '../components/FlashMessage';

function ResetPasswordForm() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [flash, setFlash] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFlash(null);

    try {
      const response = await api.post(`/auth/reset-password/${token}`, {
        password,
        confirmPassword,
      });
      setFlash({ message: response.data.message, type: 'success' });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      setFlash({
        message:
          error.response?.data?.message ||
          'Une erreur est survenue. Veuillez réessayer.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container reset-password-content">
      {flash && (
        <FlashMessage
          message={flash.message}
          type={flash.type}
          onClose={() => setFlash(null)}
        />
      )}
      <section className="content forgot-section">
        <h1>Réinitialisation du mot de passe</h1>

        <form onSubmit={handleSubmit} className="reset-form">
          <label htmlFor="password">Nouveau mot de passe</label>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-reset"
          />

          <label htmlFor="confirmPassword">Confirmation</label>
          <input
            type="password"
            name="confirmPassword"
            className="input-reset"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="btn btn-default btn-password"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Réinitialisation...' : 'Réinitialiser'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default ResetPasswordForm;
