import { useEffect, type JSX } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { getAllUsersThunk, deleteUserThunk } from "../redux/adminUsersThunk";

export default function AdminUsersTable(): JSX.Element {
  const dispatch = useAppDispatch();
  const { users, loading, errorMessage } = useAppSelector(
    (state) => state.adminUsers
  );

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (confirm("Удалить пользователя?")) {
      dispatch(deleteUserThunk(id));
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (errorMessage) return <p>Ошибка: {errorMessage}</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Email</th>
          <th>Город</th>
          <th>Телефон</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.fullName}</td>
            <td>{u.email}</td>
            <td>{u.userInfo?.city ?? "-"}</td>
            <td>{u.userInfo?.phoneNumber ?? "-"}</td>
            <td>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(u.id)}
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
