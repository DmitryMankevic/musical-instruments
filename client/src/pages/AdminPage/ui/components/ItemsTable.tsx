import { type JSX } from "react";
import { useAppDispatch } from "@/shared/hooks/hook";
import {
  deleteItemThunk,
  getAllItemsThunk,
} from "@/entities/item/redux/itemThunk";
import style from "../AdminPage.module.css";

interface Item {
  id: number;
  title: string;
  desc: string;
  price: number;
  marker: string;
  category_id: number;
  article: string;
  stock: number;
  img: string;
}

interface ItemsTableProps {
  items: Item[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  page: number;
  setPage: (n: number) => void;
  openAddModal: () => void;
  openEditModal: (item: Item | null) => void;
}

export default function ItemsTable({
  items,
  loading,
  totalPages,
  currentPage,
  page,
  setPage,
  openAddModal,
  openEditModal,
}: ItemsTableProps): JSX.Element {
  const dispatch = useAppDispatch();

  // === УДАЛЕНИЕ ТОВАРА ===
  const handleDelete = (id: number): void => {
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      dispatch(deleteItemThunk({ id, page, limit: 7 }))
        .unwrap()
        .then(() => dispatch(getAllItemsThunk({ page, limit: 7 })))
        .catch((err) => console.error("Ошибка при удалении:", err));
    }
  };

  return (
    <div className={style.section}>
      <h3>📦 Все товары</h3>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <table className={style.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Описание</th>
                <th>Цена</th>
                <th>Маркер</th>
                <th>Кат.</th>
                <th>Артикул</th>
                <th>Ост.</th>
                <th>Фото</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td className={style.descCell}>
                    <span className={style.descText}>{item.desc}</span>

                    {item.desc && item.desc.length > 50 && (
                      <span className={style.tooltipWrapper}>
                        <button
                          className={style.infoBtn}
                          onClick={(e) => e.stopPropagation()}
                          title="Показать полностью"
                        >
                          ...
                        </button>
                        <span className={style.tooltipText}>{item.desc}</span>
                      </span>
                    )}
                  </td>

                  <td>{item.price}</td>
                  <td>{item.marker}</td>
                  <td>{item.category_id}</td>
                  <td>{item.article}</td>
                  <td>{item.stock}</td>
                  <td>
                    <img
                      src={item.img}
                      alt={item.title}
                      width={70}
                      style={{
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </td>
                  <td>
                    <div className={style.actions}>
                      <button
                        className={style.iconBtn}
                        title="Редактировать"
                        onClick={() => openEditModal(item)}
                      >
                        ✏️
                      </button>
                      <button
                        className={style.iconBtn}
                        title="Удалить"
                        onClick={() => handleDelete(item.id)}
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

          {/* ПАГИНАЦИЯ */}
          {totalPages > 1 && (
            <div className={style.pagination}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`${style.pageBtn} ${
                    currentPage === i + 1 ? style.active : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
