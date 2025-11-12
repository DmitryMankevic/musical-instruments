import { useEffect, useState, type JSX } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { getAllUsersThunk } from "@/entities/admin-users/redux/adminUsersThunk";
import {
  getAllItemsThunk,
  updateItemThunk,
  deleteItemThunk,
  createItemThunk,
} from "@/entities/item/redux/itemThunk";
import { getAllCategoriesThunk } from "@/entities/category/redux/categoryThunk";
import style from "./AdminPage.module.css";

export function AdminPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { users, loading: usersLoading } = useAppSelector(
    (state) => state.adminUsers
  );
  const {
    itemArr,
    loading: itemsLoading,
    totalPages,
    currentPage,
  } = useAppSelector((state) => state.item);
  const { categoriesArr, loading: catLoading } = useAppSelector(
    (state) => state.categories
  );

  const [page, setPage] = useState(1);

  // состояние модалки
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  // функция для открытия модалки добавления товара

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    desc: "",
    price: 0,
    marker: "",
    category_id: categoriesArr[0]?.id ?? 1,
    article: "",
    stock: 0,
    img: "",
  });

  const openAddModal = () => {
    setNewItem({
      title: "",
      desc: "",
      price: 0,
      marker: "",
      category_id: categoriesArr[0]?.id ?? 1,
      article: "",
      stock: 0,
      img: "",
    });
    setIsAddModalOpen(true);
  };

  const handleNewItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "category_id"
          ? Number(value)
          : value,
    }));
  };

  const handleAddItem = () => {
    if (!newItem.title || !newItem.desc || !newItem.article) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    dispatch(
      createItemThunk(newItem)
    )
      .unwrap()
      .then(() => {
        dispatch(getAllItemsThunk({ page, limit: 7 }));
        setIsAddModalOpen(false);
      });
  };

  useEffect(() => {
    dispatch(getAllUsersThunk());
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllItemsThunk({ page, limit: 7 })); // пагинация по 7 товаров
  }, [dispatch, page]);

  // функция для открытия модалки
  const openModal = (item: any) => {
    setEditItem({ ...item });
    setIsModalOpen(true);
  };

  // обработчик изменения полей
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setEditItem((prev: any) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "category_id"
          ? Number(value)
          : value,
    }));
  };

  // сохранение изменений
  const handleSave = () => {
    if (!editItem) return;
    const normalizedItem = {
      ...editItem,
      price: Number(editItem.price),
      stock: Number(editItem.stock),
      category_id: Number(editItem.category_id),
    };
    dispatch(updateItemThunk({ id: editItem.id, item: normalizedItem }));
    setIsModalOpen(false);
  };

  // удаление товара
  const handleDelete = (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      dispatch(deleteItemThunk({ id, page, limit: 7 }))
        .unwrap()
        .then(() => {
          // сразу перезапрашиваем обновлённый список
          dispatch(getAllItemsThunk({ page, limit: 7 }));
        });
    }
  };

  return (
    <div className={style.container}>
      <h2>Админ-панель</h2>

      {/* === Пользователи === */}
      <div className={style.section}>
        <div className={style.addSection}>
          <button className={style.addBtn} onClick={() => openAddModal()}>
            Добавить
          </button>
        </div>
        <h3>👤 Все пользователи</h3>
        {usersLoading ? (
          <p>Загрузка...</p>
        ) : (
          <table className={style.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>City</th>
                <th>Address</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.userInfo?.phoneNumber ?? "-"}</td>
                  <td>{u.userInfo?.country ?? "-"}</td>
                  <td>{u.userInfo?.city ?? "-"}</td>
                  <td>{u.userInfo?.address ?? "-"}</td>
                  <td>{u.isAdmin ? "✅" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* === Товары === */}

      <div className={style.section}>
        <div className={style.addSection}>
          <button className={style.addBtn} onClick={() => openAddModal()}>
            Добавить
          </button>
        </div>
        <h3>📦 Все товары</h3>
        {itemsLoading ? (
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
                  <th>ID категория</th>
                  <th>Артикул</th>
                  <th>Остаток</th>
                  <th>Изображение</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {itemArr.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.desc}</td>
                    <td>{item.price}</td>
                    <td>{item.marker}</td>
                    <td>{item.category_id}</td>
                    <td>{item.article}</td>
                    <td>{item.stock}</td>
                    <td>
                      <img src={item.img} alt={item.title} width={80} />
                    </td>
                    <td>
                      <div className={style.actions}>
                        <button
                          className={style.iconBtn}
                          title="Редактировать"
                          onClick={() => openModal(item)}
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

            {/* === ПАГИНАЦИЯ === */}
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

      {/* === МОДАЛЬНОЕ ОКНО === */}
      {isModalOpen && editItem && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            <h3>Редактировать товар</h3>
            <label>
              Название:
              <input
                name="title"
                value={editItem.title}
                onChange={handleChange}
              />
            </label>
            <label>
              Описание:
              <input
                name="desc"
                value={editItem.desc}
                onChange={handleChange}
              />
            </label>
            <label>
              Цена:
              <input
                name="price"
                type="number"
                value={editItem.price}
                onChange={handleChange}
              />
            </label>
            <label>
              Артикул:
              <input
                name="article"
                value={editItem.article}
                onChange={handleChange}
              />
            </label>
            <label>
              Остаток:
              <input
                name="stock"
                type="number"
                value={editItem.stock}
                onChange={handleChange}
              />
            </label>

            <div className={style.modalActions}>
              <button onClick={handleSave} className={style.saveBtn}>
                💾 Сохранить
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className={style.cancelBtn}
              >
                ✖ Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === МОДАЛКА ДОБАВЛЕНИЯ === */}
      {isAddModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            <h3>Добавить новый товар</h3>
            <label>
              Название:
              <input
                name="title"
                value={newItem.title}
                onChange={handleNewItemChange}
              />
            </label>
            <label>
              Описание:
              <input
                name="desc"
                value={newItem.desc}
                onChange={handleNewItemChange}
              />
            </label>
            <label>
              Цена:
              <input
                name="price"
                type="number"
                value={newItem.price}
                onChange={handleNewItemChange}
              />
            </label>
            <label>
              Артикул:
              <input
                name="article"
                value={newItem.article}
                onChange={handleNewItemChange}
              />
            </label>
            <label>
              Остаток:
              <input
                name="stock"
                type="number"
                value={newItem.stock}
                onChange={handleNewItemChange}
              />
            </label>
            <label>
              Маркер:
              <input
                name="marker"
                value={newItem.marker}
                onChange={handleNewItemChange}
              />
            </label>
            <label>
              Изображение (URL):
              <input
                name="img"
                value={newItem.img}
                onChange={handleNewItemChange}
              />
            </label>
            <label>
              Категория:
              <select
                name="category_id"
                value={newItem.category_id}
                onChange={handleNewItemChange}
              >
                {categoriesArr.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>

            <div className={style.modalActions}>
              <button onClick={handleAddItem} className={style.saveBtn}>
                ✅ Добавить
              </button>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className={style.cancelBtn}
              >
                ✖ Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === Категории === */}
      <div className={style.section}>
        <div className={style.addSection}>
          <button className={style.addBtn} onClick={() => openAddModal()}>
             Добавить 
          </button>
        </div>
        <h3>🏷 Все категории</h3>
        {catLoading ? (
          <p>Загрузка...</p>
        ) : (
          <table className={style.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Изображение</th>
              </tr>
            </thead>
            <tbody>
              {categoriesArr.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>
                    <img src={cat.photo} alt={cat.name} width={80} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
