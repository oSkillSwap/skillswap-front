import { useState } from 'react';
import api from '../../services/api';
import type { IEnrichedProposition } from '../../types/Proposition';

type Props = {
  proposition: IEnrichedProposition;
  onClose: () => void;
  onSuccess: (grade: number, comment: string) => void;
};

function ReviewModal({ proposition, onClose, onSuccess }: Props) {
  const [grade, setGrade] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      await api.post('/me/reviews', {
        postId: proposition.Post.id,
        propositionId: proposition.id,
        grade,
        comment,
        title: `Avis pour ${proposition.Receiver.username}`,
      });

      const reviewedIds: number[] = JSON.parse(
        localStorage.getItem('reviewedPropositions') || '[]',
      );
      reviewedIds.push(proposition.id!);
      localStorage.setItem('reviewedPropositions', JSON.stringify(reviewedIds));

      onSuccess(grade, comment);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Erreur lors de l'envoi de l'avis",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Laisser un avis</h3>
        <label>
          Note (1 → 5)
          <input
            type="number"
            min={1}
            max={5}
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value))}
          />
        </label>
        <label>
          Commentaire
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-alt"
            onClick={onClose}
            disabled={loading}
          >
            Annuler
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={handleSubmit}
            disabled={loading}
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
