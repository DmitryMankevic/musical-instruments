import { useEffect, useState, type JSX } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { getAllUsersThunk } from "@/entities/admin-users/redux/adminUsersThunk";
import { getAllItemsThunk } from "@/entities/item/redux/itemThunk";
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

  useEffect(() => {
    dispatch(getAllUsersThunk());
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllItemsThunk({ page, limit: 5 })); // пагинация по 5 товаров
  }, [dispatch, page]);

  return (
    <div className={style.container}>
      <h2>Админ-панель</h2>

      {/* === Пользователи === */}
      <div className={style.section}>
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
                        <button className={style.iconBtn} title="Редактировать">
                          ✏️
                        </button>
                        <button className={style.iconBtn} title="Удалить">
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

      {/* === Категории === */}
      <div className={style.section}>
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
