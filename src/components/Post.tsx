import {
  ArrowLeft,
  ArrowRight,
  HandHelping,
  MessageSquare,
  SquarePen,
  Trash2,
} from 'lucide-react';
import './Post.scss';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import type User from '../types/User';
import Grade from './Grade';
import ConfirmModal from './profile/ConfirmModal';
import PropositionFormModal from './tabs/PropositionFormModal';

type PostProps = {
  variant: 'post' | 'offer' | 'trade';
  origin: 'profile' | 'explore';
  author?: boolean;
  offers?: { username: string }[];
  isFinished?: boolean;
  reviewed?: boolean;
  data: {
    id?: number;
    title: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
    user_id?: number;
    skill_id?: string | number;
    SkillWanted?: {
      id: number;
      name: string;
      category_id?: number;
      Category?: { id: number; name: string };
    };
    Author?: {
      id: number;
      username: string;
      avatar?: string;
      averageGrade?: number;
      nbOfReviews?: number;
    };
  };
  setUserData?: React.Dispatch<React.SetStateAction<User | null>>;
  children?: React.ReactNode;
};

function Post({ variant, origin, data, setUserData, children }: PostProps) {
  const { user: connectedUser } = useAuth();
  const isAuthor = connectedUser?.id === data?.user_id;
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDeletePost = async () => {
    try {
      await api.delete(`/me/posts/${data?.id}`);
      if (setUserData) {
        setUserData((prevUserData) => {
          if (prevUserData) {
            return {
              ...prevUserData,
              Posts: prevUserData.Posts.filter((post) => post.id !== data?.id),
            };
          }
          return prevUserData;
        });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du post :', error);
    }
  };

  const handleEditPost = async (formData: FormData) => {
    try {
      const title = formData.get('title') as string;
      const content = formData.get('content') as string;
      const editedPost = {
        title,
        content,
      };
      if (!title.trim() || !content.trim()) {
        setErrorMessage('Veuillez remplir tous les champs');
        return;
      }

      const response = await api.patch(`/me/posts/${data?.id}`, editedPost);
      console.log(response.data);

      if (setUserData) {
        setUserData((prevUserData) => {
          if (prevUserData) {
            const updatedPosts = prevUserData.Posts.map((post) => {
              if (post.id === data?.id) {
                return { ...post, ...response.data.updatedPost };
              }
              return post;
            });
            return {
              ...prevUserData,
              Posts: updatedPosts,
            };
          }
          return prevUserData;
        });
      }
      setSuccessMessage(response.data.message);
      setTimeout(() => setSuccessMessage(''), 2000);
      setIsEditing(false);
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Erreur lors de la modification du post :', error);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const author = data.Author || {
    id: 0,
    username: 'Auteur inconnu',
    avatar: '/img/avatars/robot1.jpg',
  };

  return (
    <article className="post">
      {isEditing ? (
        <form
          className="post-edit-form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleEditPost(formData);
          }}
        >
          <input
            type="text"
            name="title"
            defaultValue={data?.title}
            placeholder="Titre de l'annonce"
            className="post-edit-form-title"
            ref={inputRef}
          />
          <textarea
            name="content"
            defaultValue={data?.content}
            placeholder="Contenu de l'annonce"
            className="post-edit-form-content"
            rows={5}
          />
          <p style={{ color: 'red' }}>{errorMessage}</p>
          <div className="update-post-buttons">
            <button className="btn btn-default" type="submit">
              Enregistrer
            </button>
            <button
              className="btn btn-alt"
              type="button"
              onClick={() => {
                setIsEditing(false);
                setErrorMessage('');
              }}
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="post-header">
            {variant === 'trade' && (
              <p
                className={`post-header-arrow ${
                  author.id === connectedUser?.id ? '' : 'arrow-alt'
                }`}
              >
                {author.id === connectedUser?.id ? (
                  <ArrowLeft />
                ) : (
                  <ArrowRight />
                )}
              </p>
            )}
            <div>
              <div className="post-header-title">
                <h3>{data?.title || "Titre de l'annonce"}</h3>
                <p className="tag">{data?.SkillWanted?.name || 'Next.js'}</p>
              </div>
              <p className="post-header-date">
                {data?.updatedAt !== data?.createdAt
                  ? `Modifié le ${new Date(
                      data.updatedAt || Date.now(),
                    ).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}`
                  : `Posté le ${new Date(
                      data.createdAt || Date.now(),
                    ).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}`}
              </p>
            </div>
          </div>
          <p>
            {data?.content ||
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia molestias perferendis quisquam omnis quaerat cum harum ullam! Mollitia harum perspiciatis eius totam quaerat aliquid in, impedit quasi ipsam incidunt esse.'}
          </p>
          <p style={{ color: 'green' }}>{successMessage}</p>
        </>
      )}

      {origin === 'profile' && (
        <>
          <div className="post-btns">
            {variant === 'post' &&
              (isAuthor ? (
                !isEditing && (
                  <>
                    <button
                      className="btn btn-alt"
                      type="button"
                      onClick={() => setIsEditing(true)}
                    >
                      <SquarePen />
                      Modifier
                    </button>
                    <button
                      className="btn btn-alt btn-icon"
                      type="button"
                      onClick={() => setIsConfirmModalOpen(true)}
                    >
                      <Trash2 />
                    </button>
                  </>
                )
              ) : (
                <>
                  <button
                    className="btn btn-default"
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <HandHelping />
                    Proposer
                  </button>
                </>
              ))}
          </div>

          {isModalOpen && data.id && (
            <PropositionFormModal
              postId={data.id}
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => {
                setIsModalOpen(false);
                alert('Proposition envoyée !');
              }}
            />
          )}
        </>
      )}

      {/* {variant === 'offer' && (
        <div className="post-author">
          <div>
            <div className="post-author-userinfo">
              <img
                className="post-author-userinfo-picture"
                src="/img/avatars/robot1.jpg"
                alt=""
              />
              <div>
                <h3>Author</h3>
                <Grade rating={4} nbReviews={3} />
              </div>
            </div>
            <p className="post-offer-date">Envoyé le 24 avril 2025 à 11h52</p>
          </div>

          <div className="post-author-btns">
            <button className="btn btn-reversed" type="button">
              <MessageSquare />
              Contacter
            </button>
            <button className="btn btn-secondary" type="button">
              <SquareX />
              Annuler
            </button>
          </div>
        </div>
      )} */}

      {/* {variant === 'trade' && (
        <div className="post-author">
          <div>
            <div className="post-author-userinfo">
              <img
                className="post-author-userinfo-picture"
                src="/img/avatars/robot1.jpg"
                alt=""
              />
              <div>
                <h3>Author</h3>
                <Grade rating={4} nbReviews={3} />
              </div>
            </div>
            <p className="post-offer-date">
              {isFinished ? 'Terminé' : 'Accepté'} le 24 avril 2025 à 11h52
            </p>
          </div>

          <div className="post-author-btns">
            {isFinished ? (
              isAuthor ? (
                <button className="btn btn-secondary" type="button">
                  <Star />
                  Voir l'avis
                </button>
              ) : reviewed ? (
                <button className="btn btn-secondary" type="button">
                  <Star />
                  Modifier l'avis
                </button>
              ) : (
                <button className="btn btn-default" type="button">
                  <Star />
                  Laisser un avis
                </button>
              )
            ) : (
              <>
                <button className="btn btn-reversed" type="button">
                  <MessageSquare />
                  Contacter
                </button>
                <button className="btn btn-default" type="button">
                  <SquareCheckBig />
                  Terminer
                </button>
                <button className="btn btn-secondary" type="button">
                  <SquareX />
                  Annuler
                </button>
              </>
            )}
          </div>
        </div>
      )} */}

      {/* {offers?.map((el) => {
        return (
          <div key={el.username} className="post-offer">
            <div>
              <div className="post-offer-userinfo">
                <img
                  className="post-offer-userinfo-picture"
                  src="/img/avatars/robot1.jpg"
                  alt=""
                />
                <div>
                  <h3>{el.username}</h3>
                  <Grade rating={4} nbReviews={3} />
                </div>
              </div>
              <p className="post-offer-date">Reçu le 24 avril 2025 à 11h52</p>
            </div>

            <div className="post-offer-btns">
              <button className="btn btn-reversed btn-icon" type="button">
                <MessageSquare />
              </button>
              <button className="btn btn-default" type="button">
                <Handshake />
                Accepter
              </button>
              <button className="btn btn-secondary" type="button">
                <SquareX />
                Refuser
              </button>
            </div>
          </div>
        );
      })} */}

      {origin === 'explore' && (
        <div className="post-author">
          <div>
            <div className="post-author-userinfo">
              <img
                className="post-author-userinfo-picture"
                src={data?.Author?.avatar || '/img/avatars/robot1.jpg'}
                alt=""
              />
              <div>
                <h3>{data?.Author?.username}</h3>
                <Grade
                  rating={data.Author?.averageGrade}
                  nbReviews={data?.Author?.nbOfReviews}
                />
              </div>
            </div>
          </div>

          <div className="post-author-btns">
            <Link className="btn btn-reversed" to={`/message/${data.user_id}`}>
              <MessageSquare />
              Contacter
            </Link>
            <button
              className="btn btn-default"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              <HandHelping />
              Proposer
            </button>
          </div>

          {isModalOpen && data.id && (
            <PropositionFormModal
              postId={data.id}
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => {
                setIsModalOpen(false);
                alert('Proposition envoyée !');
              }}
            />
          )}
        </div>
      )}

      {isConfirmModalOpen && (
        <ConfirmModal
          message="Es-tu sûr de vouloir supprimer cette annonce ? Cette action est irréversible."
          onCancel={() => setIsConfirmModalOpen(false)}
          onConfirm={() => {
            handleDeletePost();
            setIsConfirmModalOpen(false);
          }}
        />
      )}

      {children}
    </article>
  );
}

export default Post;
