import type { JSX } from "react";
import style from "../AdminPage.module.css";

interface Category {
  id: number;
  name: string;
  photo: string;
}

interface CategoriesTableProps {
  categories: Category[];
  loading: boolean;
}

export default function CategoriesTable({
  categories,
  loading,
}: CategoriesTableProps): JSX.Element {
  return (
    <div className={style.section}>
      <h3>🏷 Все категории</h3>
      {loading ? (
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
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>
                  <img
                    src={cat.photo}
                    alt={cat.name}
                    width={80}
                    style={{
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
