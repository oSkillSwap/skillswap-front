import { useEffect, useState } from 'react';
import './Onboarding.scss';
import { Info } from 'lucide-react';
import { Link } from 'react-router';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  }, []);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError('');

    // Form check
    if (!email || !password || !confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
  };

  return (
    <main className="register container">
      <section className="content">
        <h1>S'inscrire</h1>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-field">
            <label className="" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
            />
          </div>

          <div className="register-form-field">
            <label className="" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="register-form-field">
            <label className="" htmlFor="confirmPassword">
              Mot de passe (confirmation)
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="register-form-field">
            <input id="cgu" type="checkbox" className="" />
            <label className="" htmlFor="cgu">
              J'accepte les{' '}
              <Link to="/cgu" target="_blank" rel="noopener noreferrer">
                conditions générales d'utilisation
              </Link>
            </label>
          </div>

          {error && (
            <p className="register-alert">
              <Info /> {error}
            </p>
          )}

          <button type="submit" className="btn btn-default">
            Valider
          </button>
          <div className="register-footer">
            <p>
              Déjà un compte ? <Link to="/login">Se connecter</Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Register;
