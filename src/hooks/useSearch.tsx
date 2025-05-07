import { useCallback, useState } from "react";
import type { IPosts } from "../types/Posts";
import type { IUsers } from "../types/Users";
import { usePosts } from "./usePosts";
import { useUsers } from "./useUsers";

export const useSearch = () => {
  const { users } = useUsers();
  const { posts } = usePosts();
  const [searchUsers, setSearchUsers] = useState<IUsers[]>([]);
  const [searchPosts, setSearchPosts] = useState<IPosts[]>([]);

  const handleSearch = useCallback(
    (search: string) => {
      const filteredUsers = users.filter(
        (user: IUsers) =>
          // Recherche de l'utilisateur par nom d'utilisateur, compétence(s) recherchée(s) ou compétence(s) possédée(s)
          user.username.toLowerCase().trim().includes(search.toLowerCase()) ||
          user.WantedSkills.some((skill) =>
            skill.name.toLowerCase().trim().includes(search.toLowerCase())
          ) ||
          user.WantedSkills.some((skill) =>
            skill.Category?.name.toLowerCase().includes(search.toLowerCase())
          ) ||
          user.Skills.some((skill) =>
            skill.name.toLowerCase().includes(search.toLowerCase())
          ) ||
          user.Skills.some((skill) =>
            skill.Category?.name.toLowerCase().includes(search.toLowerCase())
          )
      );
      setSearchUsers(filteredUsers);

      const filteredPosts = posts.filter(
        (post: IPosts) =>
          // Recherche de l'annonce par titre, compétence recherchée ou catégorie de la compétence
          post.title.toLowerCase().trim().includes(search.toLowerCase()) ||
          post.SkillWanted.name
            .toLowerCase()
            .trim()
            .includes(search.toLowerCase()) ||
          post.SkillWanted.Category?.name
            .toLowerCase()
            .trim()
            .includes(search.toLowerCase()) ||
          post.Author.username
            .trim()
            .toLowerCase()
            .includes(search.toLowerCase().trim())
      );
      setSearchPosts(filteredPosts);
    },
    [posts, users]
  );
  return { searchUsers, searchPosts, handleSearch };
};
