import { useEffect, useState } from 'react';
import './Onboarding.scss';
import { Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
  }, []);

  const handleSubmit = (formData: FormData) => {
    setError('');

    // Form check
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    // Login request
    login(email as string, password as string)
      .then(() => {
        // Redirect to homepage if successful
        navigate('/');
      })
      .catch(() => {
        setError('Erreur lors de la connexion, veuillez réessayer');
      });
  };

  return (
    <main className="login container">
      <section className="content">
        <h1>Connexion</h1>
        <form className="login-form" action={handleSubmit}>
          <div className="login-form-field">
            <label className="" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
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
              name="password"
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
