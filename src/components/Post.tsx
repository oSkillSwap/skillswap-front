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
import type { IPosts } from '../types/Posts';
import type User from '../types/User';
import ErrorToast from './ErrorToast';
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
  data: IPosts;
  setUserData?: React.Dispatch<React.SetStateAction<User | null>>;
  setPosts?: React.Dispatch<React.SetStateAction<IPosts[]>>;
  hasAlreadyProposed?: boolean;
  children?: React.ReactNode;
  onPropositionSent?: (postId: number) => void;
};

function Post({
  variant,
  origin,
  author,
  data,
  setUserData,
  children,
  setPosts,
  onPropositionSent,
  hasAlreadyProposed = false,
}: PostProps) {
  const { user: connectedUser } = useAuth();

  if (origin === 'explore' && data.isClosed) {
    return null;
  }

  const isAuthor =
    typeof author !== 'undefined'
      ? author
      : connectedUser?.id === data?.user_id;

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasProposed, setHasProposed] = useState(hasAlreadyProposed);

  const handleDeletePost = async () => {
    try {
      await api.delete(`/me/posts/${data?.id}`);

      if (setPosts) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== data?.id),
        );
      }

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
      if (!title.trim() || !content.trim()) {
        setErrorMessage('Veuillez remplir tous les champs');
        return;
      }

      const editedPost = { title, content };
      const response = await api.patch(`/me/posts/${data?.id}`, editedPost);

      if (setUserData) {
        setUserData((prevUserData) => {
          if (prevUserData) {
            const updatedPosts = prevUserData.Posts.map((post) =>
              post.id === data?.id
                ? { ...post, ...response.data.updatedPost }
                : post,
            );
            return { ...prevUserData, Posts: updatedPosts };
          }
          return prevUserData;
        });
      }

      setSuccessMessage(response.data.message);
      setTimeout(() => setSuccessMessage(''), 2000);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la modification du post :', error);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const postAuthor = data.Author || {
    id: 0,
    username: 'Auteur inconnu',
    avatar: '/img/avatars/robot1.jpg',
  };

  const isMyPost = data.user_id === connectedUser?.id;
  console.log(
    'postAuthor.id:',
    postAuthor.id,
    'connectedUser.id:',
    connectedUser?.id,
  );
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

          {errorMessage && <ErrorToast errors={errorMessage} />}

          <div className="post-edit-buttons">
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
                className={`post-header-arrow ${isMyPost ? 'arrow' : 'arrow-alt'}`}
              >
                {isMyPost ? <ArrowLeft /> : <ArrowRight />}
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
                      data?.updatedAt as string,
                    ).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}`
                  : `Posté le ${new Date(
                      data.createdAt as string,
                    ).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}`}
              </p>
            </div>
          </div>
          <p>{data?.content || 'Contenu manquant.'}</p>
          <p style={{ color: 'green' }}>{successMessage}</p>
        </>
      )}

      {origin === 'profile' && (
        <>
          <div className="post-btns">
            {variant === 'post' && !isEditing && isAuthor && (
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
            )}

            {variant === 'post' && !isEditing && !isAuthor && connectedUser && (
              <button
                className={`btn btn-default${hasProposed ? ' disabled btn-disabled' : ''}`}
                type="button"
                disabled={hasProposed}
                onClick={() => {
                  if (!hasProposed) setIsModalOpen(true);
                }}
              >
                <HandHelping />
                {hasProposed ? 'Proposition envoyée' : 'Proposer'}
              </button>
            )}
          </div>

          {isModalOpen && data.id && (
            <PropositionFormModal
              postId={data.id}
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => {
                setIsModalOpen(false);
                setHasProposed(true);
                if (data.id !== undefined) {
                  onPropositionSent?.(data.id);
                }
              }}
            />
          )}
        </>
      )}

      {origin === 'explore' && (
        <div className="post-author">
          <div>
            <div className="post-author-userinfo">
              <Link to={`/profile/${postAuthor.id}`}>
                <img
                  className="post-author-userinfo-picture"
                  src={data?.Author?.avatar || '/img/avatars/robot1.jpg'}
                  alt=""
                />
              </Link>
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
            <Link
              className="btn btn-reversed"
              to={connectedUser ? `/message/${data.user_id}` : '/login'}
            >
              <MessageSquare />
              Contacter
            </Link>
            {!isAuthor && connectedUser && (
              <button
                className={`btn btn-default${hasProposed ? ' disabled' : ''}`}
                type="button"
                disabled={hasProposed}
                onClick={() => {
                  if (!hasProposed) setIsModalOpen(true);
                }}
              >
                <HandHelping />
                {hasProposed ? 'Proposition envoyée' : 'Proposer'}
              </button>
            )}
          </div>

          {isModalOpen && data.id && (
            <PropositionFormModal
              postId={data.id}
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => {
                setIsModalOpen(false);
                setHasProposed(true);
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
