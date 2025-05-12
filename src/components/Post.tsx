import {
  ArrowLeft,
  ArrowRight,
  HandHelping,
  Handshake,
  MessageSquare,
  SquareCheckBig,
  SquarePen,
  SquareX,
  Star,
  Trash,
  Trash2,
} from "lucide-react";
import "./Post.scss";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import type User from "../types/User";
import Grade from "./Grade";
import ConfirmModal from "./profile/ConfirmModal";

type PostProps = {
  variant: "post" | "offer" | "trade";
  origin: "profile" | "explore";
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
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
};

function Post({
  variant,
  origin,
  offers,
  author,
  isFinished,
  reviewed,
  data,
  setUserData,
}: PostProps) {
  const { user: connectedUser } = useAuth();
  // Vérifie si l'utilisateur connecté est l'auteur du post
  const isAuthor = connectedUser?.id === data?.user_id;
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const handleDeletePost = async () => {
    try {
      await api.delete(`/me/posts/${data?.id}`);
      setUserData((prevUserData) => {
        if (prevUserData) {
          return {
            ...prevUserData,
            Posts: prevUserData.Posts.filter((post) => post.id !== data?.id),
          };
        }
        return prevUserData;
      });
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error("Erreur lors de la suppression du post :", error);
    }
  };

  return (
    <article className="post">
      <div className="post-header">
        {variant === "trade" &&
          (author ? (
            <p className="post-header-arrow">
              <ArrowLeft />
            </p>
          ) : (
            <p className="post-header-arrow arrow-alt">
              <ArrowRight />
            </p>
          ))}

        <div>
          <div className="post-header-title">
            <h3>{data?.title || "Titre de l'annonce"}</h3>
            <p className="tag">{data?.SkillWanted?.name || "Next.js"}</p>
            {/* Si l'utilisateur connecté est l'auteur du post, alors il peut le supprimer ou l'éditer */}
            {isAuthor && (
              <>
                <SquarePen />
                <button
                  onClick={() => setIsConfirmModalOpen(true)}
                  type="button"
                  className="btn btn-alt"
                >
                  <Trash2 />
                </button>
              </>
            )}
          </div>
          <p className="post-header-date">
            Posté le{" "}
            {new Date(data!.createdAt ?? Date.now()).toLocaleDateString(
              "fr-FR",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            ) || "24 avril 2025"}
          </p>
        </div>
      </div>

      <p>
        {data?.content ||
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia molestias perferendis quisquam omnis quaerat cum harum ullam! Mollitia harum perspiciatis eius totam quaerat aliquid in, impedit quasi ipsam incidunt esse."}
      </p>

      {origin === "profile" && (
        <>
          <div className="post-btns">
            {variant === "post" &&
              (author ? (
                <>
                  <button className="btn btn-alt" type="button">
                    <SquarePen />
                    Modifier
                  </button>
                  <button className="btn btn-alt btn-icon" type="button">
                    <Trash />
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-default" type="button">
                    <HandHelping />
                    Proposer
                  </button>
                </>
              ))}
          </div>

          {variant === "offer" && (
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
                  Envoyé le 24 avril 2025 à 11h52
                </p>
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
          )}

          {variant === "trade" && (
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
                  {isFinished ? "Terminé" : "Accepté"} le 24 avril 2025 à 11h52
                </p>
              </div>

              <div className="post-author-btns">
                {isFinished ? (
                  author ? (
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
          )}
        </>
      )}

      {offers?.map((el) => {
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
      })}

      {origin === "explore" && (
        <div className="post-author">
          <div>
            <div className="post-author-userinfo">
              <img
                className="post-author-userinfo-picture"
                src={data?.Author?.avatar || "/img/avatars/robot1.jpg"}
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
            <button className="btn btn-reversed" type="button">
              <MessageSquare />
              Contacter
            </button>
            <button className="btn btn-default" type="button">
              <HandHelping />
              Proposer
            </button>
          </div>
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
    </article>
  );
}

export default Post;
