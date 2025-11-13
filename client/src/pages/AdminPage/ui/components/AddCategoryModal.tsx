import { useState, type JSX } from "react";
import { useAppDispatch } from "@/shared/hooks/hook";
import {
  createCategoryThunk,
  getAllCategoriesThunk,
} from "@/entities/category/redux/categoryThunk";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import style from "../AdminPage.module.css";

export default function AddCategoryModal({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSave = async (): Promise<void> => {
    if (!name.trim()) {
      alert("Введите название категории");
      return;
    }

    let imageUrl = "";

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

    await dispatch(createCategoryThunk({ name, photo: imageUrl || "" }));
    dispatch(getAllCategoriesThunk());
    onClose();
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <h3>Добавить категорию</h3>
        <label>
          Название:
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Изображение:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          />
        </label>
        {uploading && <p>Загрузка изображения...</p>}
        <div className={style.modalActions}>
          <button className={style.saveBtn} onClick={handleSave}>
             Добавить
          </button>
          <button className={style.cancelBtn} onClick={onClose}>
             Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
