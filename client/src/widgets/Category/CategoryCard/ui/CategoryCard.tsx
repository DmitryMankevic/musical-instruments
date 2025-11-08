import type { JSX } from "react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store/store";
import styles from "./CategoryCard.module.css";
import { deleteCategoryThunk } from "@/entities/category/redux/categoryThunk"; // ← уточни путь
import { useCallback, useState } from "react";
import ConfirmationModal from "@/widgets/Category/ConfirmationModal/ConfirmationModal"; // ← создадим ниже
import CategoryEditModalForm from "../../CategoryEditModalForm/ui/CategoryEditModalForm";

interface CategoryCardProps {
  id: number;
  name: string;
  photo: string;
  isAdmin: boolean;
}

function CategoryCard({
  id,
  name,
  photo,
  isAdmin,
}: CategoryCardProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // не переходим по ссылке
    e.stopPropagation(); // не срабатывает клик по всей карточке, а только по крестику
    setShowConfirm(true);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deleteCategoryThunk(id)).unwrap();
      setShowConfirm(false);
    } catch (err) {
      console.error("Ошибка удаления категории:", err);
    }
  }, [dispatch, id]);

  return (
    <>
      <Link to={`/category/${id}`} className={styles.card}>
        {isAdmin === true && (
          <>
            <>
              <button
                type="button"
                className={styles.editButton}
                onClick={handleEditClick}
                aria-label="Редактировать"
              >
                ✏️
              </button>
            </>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={handleDeleteClick}
              aria-label="Удалить категорию"
            >
              ✕
            </button>
          </>
        )}
        <div className={styles.imageWrapper}>
          <img src={photo} alt={name} className={styles.image} loading="lazy" />
        </div>
        <span className={styles.name}>{name}</span>
      </Link>

      {/* Модалка подтверждения */}
      <ConfirmationModal
        show={showConfirm}
        title="Удалить категорию?"
        body={`Вы уверены, что хотите удалить категорию «${name}»? Это действие нельзя отменить.`}
        confirmText="Удалить"
        cancelText="Отмена"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
      <CategoryEditModalForm
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        categoryId={id}
        initialName={name}
        initialPhoto={photo}
      />
    </>
  );
}

export default CategoryCard;
