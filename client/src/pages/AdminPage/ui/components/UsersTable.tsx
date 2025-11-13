import type { JSX } from "react";
import style from "../AdminPage.module.css";
import { useAppDispatch } from "@/shared/hooks/hook";
import { toggleAdminStatusThunk } from "@/entities/admin-users/redux/adminUsersThunk";

interface User {
  id: number;
  fullName: string;
  email: string;
  isAdmin: boolean;
  userInfo?: {
    phoneNumber?: string;
    country?: string;
    city?: string;
    address?: string;
  };
}

export default function UsersTable({
  users,
  loading,
}: {
  users: User[];
  loading: boolean;
}): JSX.Element {
  const dispatch = useAppDispatch();

    const handleToggleAdmin = (id: number): void => {
    dispatch(toggleAdminStatusThunk(id));
  };
  return (
    <div className={style.section}>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <table className={style.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Email</th>
              <th>Телефон</th>
              <th>Страна</th>
              <th>Город</th>
              <th>Адрес</th>
              <th>Admin</th>
              <th>Действие</th>
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
                 <td>
                  <button
                    className={style.iconBtn}
                    onClick={() => handleToggleAdmin(u.id)}
                  >
                    {u.isAdmin ? "Снять права" : "Сделать админом"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
