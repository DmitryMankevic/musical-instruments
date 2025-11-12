import { useState, type JSX } from "react";
import { useAppDispatch } from "@/shared/hooks/hook";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import {
  createItemThunk,
  getAllItemsThunk,
} from "@/entities/item/redux/itemThunk";
import style from "../AdminPage.module.css";

interface Category {
  id: number;
  name: string;
}

interface AddItemModalProps {
  onClose: () => void;
  categories: Category[];
  page: number;
}

export default function AddItemModal({
  onClose,
  categories,
  page,
}: AddItemModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [newItem, setNewItem] = useState({
    title: "",
    desc: "",
    price: 0,
    marker: "",
    category_id: categories[0]?.id ?? 1,
    article: "",
    stock: 0,
    img: "",
  });

  const [useFileUpload, setUseFileUpload] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // обработка изменения текстовых полей
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "category_id"
          ? Number(value)
          : value,
    }));
  };

  // обработка выбора файла
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  // отправка данных
  const handleSubmit = async (): Promise<void> => {
    try {
      if (!newItem.title || !newItem.desc || !newItem.article) {
        alert("Пожалуйста, заполните все обязательные поля.");
        return;
      }

      let imageUrl = newItem.img;

      if (useFileUpload && imageFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await axiosInstance.post("/upload", formData, {
          headers: { "Content-Type": undefined },
        });

        const fileName = response.data.fileName;
        imageUrl = import.meta.env.VITE_API + `/uploads/images/${fileName}`;
        setUploading(false);
      }

      await dispatch(
        createItemThunk({
          ...newItem,
          img: imageUrl,
        })
      ).unwrap();

      dispatch(getAllItemsThunk({ page, limit: 7 }));
      onClose();
    } catch (err) {
      console.error("Ошибка при добавлении товара:", err);
      setUploading(false);
    }
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <h3>Добавить новый товар</h3>

        <label>
          Название:
          <input
            name="title"
            value={newItem.title}
            onChange={handleChange}
            placeholder="Введите название"
          />
        </label>

        <label>
          Описание:
          <input
            name="desc"
            value={newItem.desc}
            onChange={handleChange}
            placeholder="Введите описание"
          />
        </label>

        <label>
          Цена:
          <input
            name="price"
            type="number"
            value={newItem.price}
            onChange={handleChange}
          />
        </label>

        <label>
          Артикул:
          <input
            name="article"
            value={newItem.article}
            onChange={handleChange}
          />
        </label>

        <label>
          Остаток:
          <input
            name="stock"
            type="number"
            value={newItem.stock}
            onChange={handleChange}
          />
        </label>

        <label>
          Маркер:
          <input
            name="marker"
            value={newItem.marker}
            onChange={handleChange}
          />
        </label>

        {/* Переключатель URL / файл */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={useFileUpload}
              onChange={(e) => setUseFileUpload(e.target.checked)}
            />{" "}
            Загрузить файл вместо URL
          </label>
        </div>

        {useFileUpload ? (
          <>
            <label>
              Файл изображения:
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>

            {uploading && <p>⏳ Загружается...</p>}

            {imagePreview && (
              <div className="text-center">
                <img
                  src={imagePreview}
                  alt="Превью"
                  style={{
                    maxHeight: "150px",
                    maxWidth: "100%",
                    objectFit: "contain",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginTop: "8px",
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <label>
            URL изображения:
            <input
              name="img"
              value={newItem.img}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </label>
        )}

        <label>
          Категория:
          <select
            name="category_id"
            value={newItem.category_id}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <div className={style.modalActions}>
          <button
            onClick={handleSubmit}
            className={style.saveBtn}
            disabled={uploading}
          >
            {uploading ? "⏳ Добавляю..." : " Добавить"}
          </button>
          <button onClick={onClose} className={style.cancelBtn}>
             Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
