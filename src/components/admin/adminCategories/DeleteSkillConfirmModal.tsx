import './DeleteSkillConfirmModal.scss';

type Props = {
  skillName: string;
  onClose: () => void;
  onConfirm: () => void;
};

function DeleteSkillConfirmModal({ skillName, onClose, onConfirm }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Supprimer la compétence</h2>
        <p>
          Es-tu sûr de vouloir supprimer la compétence{' '}
          <strong>{skillName}</strong> ?
        </p>
        <div className="modal-actions">
          <button type="button" className="btn btn-default" onClick={onConfirm}>
            Oui, supprimer
          </button>
          <button type="button" className="btn btn-alt" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteSkillConfirmModal;
