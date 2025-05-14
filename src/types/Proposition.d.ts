export interface IProposition {
  id?: number;
  content: string;
  state: 'en attente' | 'acceptée' | 'refusée';
  post_id: number;
  sender_id: number;
  receiver_id: number;
  createdAt?: string;
  updatedAt?: string;
  Sender?: {
    id: number;
    username: string;
    avatar: string;
  };
}

export interface IEnrichedProposition extends IProposition {
  isFinishedBySender?: boolean;
  isFinishedByReceiver?: boolean;
  hasReviewByOwner?: boolean;
  Post: {
    id: number;
    title: string;
    content: string;
    createdAt?: string;
    user_id?: number;
    SkillWanted?: {
      id: number;
      name: string;
    };
  };
  Receiver: {
    id: number;
    username: string;
    avatar?: string;
    averageGrade?: number;
    nbOfReviews?: number;
  };
  hasReview?: boolean;
}
