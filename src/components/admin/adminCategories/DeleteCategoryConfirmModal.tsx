import api from '../../../services/api';

type Category = {
  id: number;
  name: string;
};

type Props = {
  category: Category;
  onClose: () => void;
  onDeleteSuccess: (deletedId: number) => void;
};

function DeleteCategoryConfirmModal({
  category,
  onClose,
  onDeleteSuccess,
}: Props) {
  const handleDelete = async () => {
    try {
      await api.delete(`/admin/category/${category.id}`);
      onDeleteSuccess(category.id);
      onClose();
    } catch (err) {
      console.error('Erreur suppression catégorie', err);
      alert('Échec de la suppression.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal danger">
        <h2>Supprimer la catégorie</h2>
        <p>
          Êtes-vous sûr de vouloir supprimer la catégorie{' '}
          <strong>{category.name}</strong> ?
        </p>

        <div className="modal-actions">
          <button type="button" className="btn btn-alt" onClick={onClose}>
            Annuler
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleDelete}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCategoryConfirmModal;
