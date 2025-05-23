import { useEffect, useRef, useState } from 'react';
import './Onboarding.scss';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import ErrorToast from '../components/ErrorToast';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import PageTransition from '../utils/PageTransition';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPwdHidden, setIsPwdHidden] = useState(true);
  const [acceptedCgu, setAcceptedCgu] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { user: connectedUser } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const newErrors: string[] = [];

    if (!email || !password || !confirmPassword || !username) {
      newErrors.push('Veuillez remplir tous les champs obligatoires');
    }

    if (password !== confirmPassword) {
      newErrors.push('Les mots de passe ne correspondent pas');
    }

    if (!acceptedCgu) {
      newErrors.push(
        'Vous devez accepter les conditions générales d’utilisation',
      );
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await api.post('/register', {
        email,
        password,
        username,
        firstName: undefined,
        lastName: undefined,
        description: undefined,
      });

      navigate('/login');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;

        if (data?.errors?.fieldErrors) {
          const allErrors = Object.values(data.errors.fieldErrors).flat();
          setErrors(allErrors as string[]);
        } else if (data?.message) {
          setErrors([data.message]);
        } else {
          setErrors(["Une erreur s'est produite pendant l'inscription."]);
        }
      } else {
        setErrors(['Une erreur inconnue est survenue.']);
      }
    }
  };

  if (connectedUser) {
    navigate('/profile');
    return;
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <main className="register container">
      <section className="content">
        <h1>S'inscrire</h1>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-field">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="JohnDoe"
              aria-required="true"
              required
              ref={inputRef}
            />
          </div>

          <div className="register-form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              aria-required="true"
              required
            />
          </div>

          <div className="register-form-field">
            <label htmlFor="password">Mot de passe</label>

            <div className="form-password">
              <input
                id="password"
                type={isPwdHidden ? 'password' : 'text'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="••••••••"
                aria-required="true"
                required
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setIsPwdHidden(!isPwdHidden)}
              >
                {isPwdHidden ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>

          <div className="register-form-field">
            <label htmlFor="confirmPassword">Confirmation mot de passe</label>
            <input
              id="confirmPassword"
              type={isPwdHidden ? 'password' : 'text'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="••••••••"
              aria-required="true"
              required
            />
          </div>

          <div className="register-form-field">
            <input
              id="cgu"
              type="checkbox"
              checked={acceptedCgu}
              onChange={(e) => setAcceptedCgu(e.target.checked)}
              aria-required="true"
              required
            />
            <label htmlFor="cgu">
              J'accepte les{' '}
              <Link
                to="/terms"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
              >
                conditions générales d'utilisation
              </Link>
            </label>
          </div>

          {errors.length > 0 && <ErrorToast errors={errors} />}

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

export default PageTransition(Register);
