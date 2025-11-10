import { useEffect, type JSX } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { getAllUsersThunk } from "@/entities/admin-users/redux/adminUsersThunk";
import { getAllItemsThunk } from "@/entities/item/redux/itemThunk";
import { getAllCategoriesThunk } from "@/entities/category/redux/categoryThunk";
import style from "./AdminPage.module.css";

export function AdminPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { users, loading: usersLoading } = useAppSelector((state) => state.adminUsers);
  const { itemArr, loading: itemsLoading } = useAppSelector((state) => state.item);
  const { categoriesArr, loading: catLoading } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllUsersThunk());
    dispatch(getAllItemsThunk());
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

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
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
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
          <ul>
            {itemArr.map((item) => (
              <li key={item.id}>
                {item.title} — {item.price} ₽
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* === Категории === */}
      <div className={style.section}>
        <h3>🏷 Все категории</h3>
        {catLoading ? (
          <p>Загрузка...</p>
        ) : (
          <ul>
            {categoriesArr.map((cat) => (
              <li key={cat.id}>{cat.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
