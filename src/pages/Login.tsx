import { useEffect, useState } from 'react';
import './Onboarding.scss';
import { Info } from 'lucide-react';
import { Link } from 'react-router';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
    setError('');
  }, []);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError('');

    // Form check
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
  };

  return (
    <main className="login container">
      <section className="content">
        <h1>Connexion</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-field">
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

          <div className="login-form-field">
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

          {error && (
            <p className="login-alert">
              <Info /> {error}
            </p>
          )}

          <div className="login-form-field">
            <input id="remember" type="checkbox" className="" />
            <label className="" htmlFor="remember">
              Se souvenir de moi
            </label>
          </div>

          <Link to="/">Mot de passe oublié ?</Link>

          <button type="submit" className="btn btn-default">
            Se connecter
          </button>
          <div className="login-footer">
            <p>
              Pas encore de compte ? <Link to="/register">S'inscrire</Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
