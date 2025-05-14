import { useState } from 'react';
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
    if (loading) return;
    try {
      setLoading(true);
      setError('');

      if (!proposition.Sender) {
        setError("Impossible d'envoyer l'avis : utilisateur introuvable.");
        return;
      }

      onSuccess(grade, comment);

      onClose();
    } catch (err: any) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error("Erreur lors de la préparation de l'avis", err);
      const serverMsg =
        err?.response?.data?.message ||
        "Une erreur s'est produite lors de l'envoi de l'avis.";
      setError(serverMsg);
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
            disabled={loading}
          />
        </label>
        <label>
          Commentaire
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            disabled={loading}
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
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
