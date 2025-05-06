import type Review from './Review';

export default interface User {
  id: number;
  username: string;
  lastName: string;
  firstName: string;
  role: string;
  isBanned: boolean;
  isAvailable: boolean;
  description: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  Skills: { id: number; name: string }[];
  WantedSkills: { id: number; name: string }[];
  Availabilities: {
    day_of_the_week:
      | 'Lundi'
      | 'Mardi'
      | 'Mercredi'
      | 'Jeudi'
      | 'Vendredi'
      | 'Samedi'
      | 'Dimanche';
    time_slot: 'matin' | 'midi' | 'après-midi' | 'soir';
  }[];
  Followers: { id: number; username: string; avatar: string }[];
  Follows: { id: number; username: string; avatar: string }[];
  Posts: {
    id: number;
    content: string;
    title: string;
    isClosed: boolean;
    createdAt: string;
    updatedAt: string;
    user_id: number;
    skill_id: number;
    SkillWanted: { id: number; name: string };
  }[];
  Reviews: Review[];
}
