import Grade from '../Grade';
import './ReviewingModal.scss';

type ReviewingModalProps = {
  grade: number;
  comment: string;
  onClose: () => void;
};

function ReviewingModal({ grade, comment, onClose }: ReviewingModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>
          <Grade rating={grade} />
        </p>
        <p className="comment-modal-review">{comment}</p>
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
