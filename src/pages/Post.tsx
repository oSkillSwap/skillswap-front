import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import type { IPosts } from '../types/Posts';
import type { ISkills } from '../types/Skills';
import PageTransition from '../utils/PageTransition';
import './Post.scss';

function Post() {
  const [posts, setPosts] = useState<[] | IPosts[]>([]);
  const [skills, setSkills] = useState<ISkills[] | []>([]);
  const [error, setError] = useState<string>('');
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const currentUserId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  // Récupération des compétences
  useEffect(() => {
    const getSkills = async () => {
      try {
        const response = await api.get('/skills');
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.log(response.data);
        const data = response.data;
        setSkills(data.skills);
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error('Error fetching skills:', error);
      }
    };
    getSkills();
  }, []);

  // Récupération des posts de l'utilisateur
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await api.get('/me/posts');
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.log(response.data);
        const data = response.data;
        setPosts(data.posts);
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error('Error fetching posts:', error);
      }
    };
    getPosts();
  }, []);

  // Fonction de soumission du formulaire
  const handleSubmit = async (formData: FormData) => {
    try {
      setError('');
      const title = formData.get('title') as string;
      const content = formData.get('content') as string;
      const skill_id = Number(formData.get('skill_id') as string);
      const user_id = currentUserId;
      const newPost = {
        title,
        content,
        skill_id,
        user_id,
      };

      // Vérification des champs du formulaire
      if (!title.trim() || !content.trim()) {
        setError('Veuillez remplir tous les champs.');
        return;
      }
      if (!user_id) {
        setError('Utilisateur non trouvé.');
        return;
      }

      // Vérification de la compétence sélectionnée
      if (!skill_id) {
        setError('Veuillez sélectionner une compétence.');
        return;
      }

      // Vérification de la longueur du titre
      if (title.length < 1 || title.length > 40) {
        setError('Le titre doit faire entre 1 et 40 caractères.');
        return;
      }

      // Vérification de la longueur du contenu
      if (content.length < 1 || content.length > 500) {
        setError('Le contenu doit faire entre 1 et 500 caractères.');
        return;
      }

      // Vérification de l'existence de la compétence
      const findSkill = skills.find((skill) => skill.id === +skill_id);
      if (!findSkill) {
        setError('Compétence non trouvée.');
        return;
      }

      // Vérification du nombre de posts
      // Limite à 10 posts par utilisateur
      if (posts.length >= 10) {
        setError('Vous avez atteint le nombre maximum de posts.');
        return;
      }

      // Vérification de l'existence de la compétence dans les posts
      // Limite à 1 post par compétence
      const findSkillInPosts = posts.find(
        (post) => post.SkillWanted?.id === +skill_id,
      );
      if (findSkillInPosts) {
        setError('Vous avez déjà posté une annonce pour cette compétence.');
        return;
      }

      // Envoi du post à l'API
      await api.post('/me/posts', newPost, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPosts([...posts, newPost]);
      setError('');
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Error submitting form:', error);
    }
  };

  if (!user) {
    navigate('/login');
  }

  return (
    <main className="container">
      <section className="content">
        <h1>Post</h1>
        <form
          className="add-post-form"
          action={(formData) => {
            handleSubmit(formData);
          }}
        >
          <div className="add-post-form-input">
            <label htmlFor="add-post-title">Titre</label>
            <input
              id="add-post-title"
              type="text"
              name="title"
              placeholder="Titre de l'annonce"
              ref={inputRef}
            />
          </div>
          <div className="add-post-form-input">
            <label htmlFor="add-post-content">Description</label>
            <textarea
              id="add-post-content"
              name="content"
              placeholder="Contenu de l'annonce"
            />
          </div>
          {/* Permet d'afficher chaque compétence dans le groupe (optgroup) correspondant à sa catégorie. */}
          <select name="skill_id" id="skill_id">
            {[...new Set(skills.map((skill) => skill.Category.name))].map(
              (categoryName) => (
                <optgroup label={categoryName} key={categoryName}>
                  {skills
                    .filter((skill) => skill.Category.name === categoryName)
                    .map((skill) => (
                      <option value={skill.id} key={skill.name}>
                        {skill.name}
                      </option>
                    ))}
                </optgroup>
              ),
            )}
          </select>

          <button type="submit" className="btn btn-default">
            Poster
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </section>
    </main>
  );
}

export default PageTransition(Post);
