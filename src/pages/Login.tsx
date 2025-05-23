import { useEffect, useRef, useState } from 'react';
import './Onboarding.scss';
import { AxiosError } from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import ErrorToast from '../components/ErrorToast';
import { useAuth } from '../contexts/AuthContext';
import PageTransition from '../utils/PageTransition';

function Login() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isPwdHidden, setIsPwdHidden] = useState(true);
  const { user: connectedUser } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
  }, []);

  const handleSubmit = async () => {
    setError('');

    // Form check
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    // Login request
    try {
      await login(email, password, remember);
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Une erreur est survenue');
      }
    }
  };

  if (connectedUser) {
    navigate('/profile');
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <main className="login container">
      <section className="content">
        <h1>Connexion</h1>
        <form className="login-form" action={handleSubmit}>
          <div className="login-form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              ref={inputRef}
            />
          </div>

          <div className="login-form-field">
            <label htmlFor="password">Mot de passe</label>
            <div className="form-password">
              <input
                id="password"
                type={isPwdHidden ? 'password' : 'text'}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setIsPwdHidden(!isPwdHidden)}
                tabIndex={-1}
              >
                {isPwdHidden ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>

          {error && <ErrorToast errors={error} />}

          <div className="login-form-field">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember">Se souvenir de moi</label>
          </div>

          <button type="submit" className="btn btn-default">
            Se connecter
          </button>
          <div className="login-footer">
            <Link to="/forgot-password">Mot de passe oublié ?</Link>
            <p>
              Pas encore de compte ? <Link to="/register">S'inscrire</Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

export default PageTransition(Login);
