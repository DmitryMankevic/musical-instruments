import { useState, type JSX } from "react";
import { useAppDispatch } from "@/shared/hooks/hook";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import {
  updateItemThunk,
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
interface EditItemModalProps {
  item: Item;
  onClose: () => void;
  page: number;
}

export default function EditItemModal({
  item,
  onClose,
  page,
}: EditItemModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [editItem, setEditItem] = useState({ ...item });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setEditItem((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "category_id"
          ? Number(value)
          : value,
    }));
  };

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

  const handleSave = async (): Promise<void> => {
    try {
      let imageUrl = editItem.img;

      // если пользователь выбрал новый файл
      if (imageFile) {
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

      const updated = {
        ...editItem,
        img: imageUrl,
      };

      await dispatch(updateItemThunk({ id: editItem.id, item: updated }));
      dispatch(getAllItemsThunk({ page, limit: 7 }));
      onClose();
    } catch (err) {
      console.error("Ошибка при редактировании товара:", err);
      setUploading(false);
    }
  };

  return (
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
          <input name="desc" value={editItem.desc} onChange={handleChange} />
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

        <div>
          <p>Текущее изображение:</p>
          <img
            src={editItem.img}
            alt={editItem.title}
            width={100}
            style={{ borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <label>
          Новое изображение (необязательно):
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Новое превью"
            style={{
              maxHeight: "150px",
              maxWidth: "100%",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginTop: "8px",
            }}
          />
        )}

        <div className={style.modalActions}>
          <button
            onClick={handleSave}
            className={style.saveBtn}
            disabled={uploading}
          >
            {uploading ? "⏳ Сохраняю..." : "💾 Сохранить"}
          </button>
          <button onClick={onClose} className={style.cancelBtn}>
            ✖ Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
