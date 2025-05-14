type ReviewingModalProps = {
  grade: number;
  comment: string;
  onClose: () => void;
};

function ReviewingModal({ grade, comment, onClose }: ReviewingModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Avis reçu</h3>
        <p>
          <strong>Note :</strong> {grade}/5
        </p>
        <p>
          <strong>Commentaire :</strong>
        </p>
        <p>{comment}</p>
        <div className="modal-actions">
          <button type="button" className="btn btn-default" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewingModal;
