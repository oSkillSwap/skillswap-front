import { useState } from 'react';
import FlashMessage from '../components/FlashMessage';
import api from '../services/api';
import './ForgotPasswordForm.scss';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [flash, setFlash] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFlash(null);

    try {
      const response = await api.post('/auth/forgot-password', { email });
      setFlash({ message: response.data.message, type: 'success' });
    } catch {
      setFlash({
        message: "Erreur lors de l'envoi du lien de réinitialisation.",
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
        <h1>Mot de passe oublié</h1>

        <form className="reset-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            required
            placeholder="votre@email.com"
            onChange={(e) => setEmail(e.target.value)}
            className="input-reset"
          />

          <button
            type="submit"
            className="btn btn-default btn-password"
            disabled={isLoading}
          >
            {isLoading ? 'Envoi...' : 'Envoyer le lien'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default ForgotPassword;
