import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import type { IPosts } from '../types/Posts';
import type { ISkills } from '../types/Skills';
import PageTransition from '../utils/PageTransition';
import './Post.scss';
import ErrorToast from '../components/ErrorToast';

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
        console.log(response.data);
        setSkills(response.data.skills);
      } catch (error) {
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
        console.log(response.data);
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getPosts();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    try {
      setError('');
      const title = formData.get('title') as string;
      const content = formData.get('content') as string;
      const skill_id = Number(formData.get('skill_id') as string);
      const user_id = currentUserId;

      const newPost = { title, content, skill_id, user_id };

      if (!title.trim() || !content.trim()) {
        setError('Veuillez remplir tous les champs.');
        return;
      }

      if (!user_id) {
        setError('Utilisateur non trouvé.');
        return;
      }

      if (!skill_id) {
        setError('Veuillez sélectionner une compétence.');
        return;
      }

      if (title.length < 1 || title.length > 40) {
        setError('Le titre doit faire entre 1 et 40 caractères.');
        return;
      }

      if (content.length < 1 || content.length > 500) {
        setError('Le contenu doit faire entre 1 et 500 caractères.');
        return;
      }

      const findSkill = skills.find((skill) => skill.id === skill_id);
      if (!findSkill) {
        setError('Compétence non trouvée.');
        return;
      }

      if (posts.length >= 10) {
        setError('Vous avez atteint le nombre maximum de posts.');
        return;
      }

      const findSkillInPosts = posts.find(
        (post) => post.SkillWanted?.id === skill_id,
      );
      if (findSkillInPosts) {
        setError('Vous avez déjà posté une annonce pour cette compétence.');
        return;
      }

      await api.post('/me/posts', newPost, {
        headers: { 'Content-Type': 'application/json' },
      });

      setPosts([...posts, newPost]);
      setError('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (!user) {
    navigate('/login');
  }

  // 👇 Catégories uniques (et sécurisées)

  const uniqueCategoryNames = [
    ...new Set(skills.map((skill) => skill.Category?.name).filter(Boolean)),
  ];

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

          <div className="add-post-form-input">
            <label htmlFor="skill_id">Compétence</label>
            <select name="skill_id" id="skill_id">
              {uniqueCategoryNames.map((categoryName) => (
                <optgroup label={categoryName} key={categoryName}>
                  {skills
                    .filter(
                      (skill) =>
                        skill.Category && skill.Category.name === categoryName,
                    )
                    .map((skill) => (
                      <option value={skill.id} key={skill.id}>
                        {skill.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-default">
            Poster
          </button>

          {error && <ErrorToast errors={error} />}
        </form>
      </section>
    </main>
  );
}

export default PageTransition(Post);
