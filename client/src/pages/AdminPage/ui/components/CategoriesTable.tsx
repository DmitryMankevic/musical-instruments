import type { JSX } from "react";
import { useAppDispatch } from "@/shared/hooks/hook";
import {
  deleteCategoryThunk,
  getAllCategoriesThunk,
} from "@/entities/category/redux/categoryThunk";
import style from "../AdminPage.module.css";
import type { ICategory } from "@/entities/category/model";

interface CategoriesTableProps {
  categories: ICategory[];
  loading: boolean;
  openAddModal: () => void;
  openEditModal: (category: ICategory) => void;
}

export default function CategoriesTable({
  categories,
  loading,
  openAddModal,
  openEditModal,
}: CategoriesTableProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleDelete = (id: number): void => {
    if (window.confirm("Удалить категорию?")) {
      dispatch(deleteCategoryThunk(id))
        .unwrap()
        .then(() => dispatch(getAllCategoriesThunk()))
        .catch((err) => console.error("Ошибка при удалении категории:", err));
    }
  };

  return (
    <div className={style.section}>
      
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <>
        <table className={style.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Изображение</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>
                  <img
                    src={cat.photo}
                    alt={cat.name}
                    width={70}
                    style={{
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      background: "#fff",
                    }}
                  />
                </td>
                <td>
                  <div className={style.actions}>
                    <button
                      className={style.iconBtn}
                      onClick={() => openEditModal(cat)}
                      title="Редактировать"
                    >
                      ✏️
                    </button>
                    <button
                      className={style.iconBtn}
                      onClick={() => handleDelete(cat.id)}
                      title="Удалить"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <div className={style.addSection}>
        <button className={style.addBtn} onClick={openAddModal}>
           Добавить
        </button>
      </div>
      </>
      )}
      
    </div>
  );
}
