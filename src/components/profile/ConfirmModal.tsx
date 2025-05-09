import './ConfirmModal.scss';

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({ message, onConfirm, onCancel }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirmation</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Oui, supprimer
          </button>
          <button type="button" className="btn btn-default" onClick={onCancel}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
