import type { JSX } from "react";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/shared/hooks/hook";
import { getAllCategoriesThunk, updateCategoryThunk } from "@/entities/category/redux/categoryThunk";

interface FormData {
  name: string;
  photo: string;
}

interface CategoryEditModalFormProps {
  show: boolean;
  onClose: () => void;
  categoryId: number;
  initialName: string;
  initialPhoto: string;
}

export default function CategoryEditModalForm({
  show,
  onClose,
  categoryId,
  initialName,
  initialPhoto,
}: CategoryEditModalFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [imagePreview, setImagePreview] = useState<string | null>(initialPhoto);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [useFileUpload, setUseFileUpload] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: initialName,
      photo: initialPhoto,
    },
    mode: "onTouched",
  });

  const photoUrl = watch("photo");

  // Обновляем превью при изменении URL или файла
  useEffect(() => {
    if (useFileUpload && imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (!useFileUpload && photoUrl) {
      setImagePreview(photoUrl);
    } else {
      setImagePreview(null);
    }
  }, [photoUrl, imageFile, useFileUpload]);

  // Сброс при открытии/закрытии
  useEffect(() => {
    if (show) {
      reset({ name: initialName, photo: initialPhoto });
      setImagePreview(initialPhoto);
      setImageFile(null);
      setUseFileUpload(false);
    }
  }, [show, initialName, initialPhoto, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) setValue("photo", ""); // очищаем URL
  };

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      // ⚠️ Пока отправляем как есть (файлы требуют FormData + бэкенд)
     await dispatch(
        updateCategoryThunk({
          id: categoryId,
          name: data.name, 
          photo: data.photo,
        })
      ).unwrap();
      await dispatch(getAllCategoriesThunk());
      onClose();
    } catch (err) {
      console.error("Ошибка при обновлении категории:", err);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать категорию</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FloatingLabel label="Название категории *" className="mb-3">
            <Form.Control
              type="text"
              {...register("name", {
                required: "Укажите название категории",
                minLength: { value: 2, message: "Минимум 2 символа" },
              })}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </FloatingLabel>

          <div className="mb-3">
            <Form.Check
              type="switch"
              id="edit-category-photo-switch"
              label={useFileUpload ? "Загрузить файл" : "Указать URL изображения"}
              checked={useFileUpload}
              onChange={(e) => setUseFileUpload(e.target.checked)}
            />
          </div>

          {useFileUpload ? (
            <div className="mb-3">
              <Form.Label>Изображение *</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                isInvalid={!!errors.photo && !imageFile}
              />
              <Form.Control.Feedback type="invalid">
                Выберите изображение
              </Form.Control.Feedback>
            </div>
          ) : (
            <FloatingLabel label="URL изображения *" className="mb-3">
              <Form.Control
                type="url"
                {...register("photo", {
                  required: "Укажите URL изображения",
                  pattern: {
                    value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                    message: "Некорректный URL изображения",
                  },
                })}
                isInvalid={!!errors.photo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.photo?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          )}

          {imagePreview && (
            <div className="mb-3 text-center">
              <img
                src={imagePreview}
                alt="Превью категории"
                style={{
                  maxHeight: "150px",
                  maxWidth: "100%",
                  objectFit: "contain",
                  borderRadius: "4px",
                  border: "1px solid #dee2e6",
                }}
              />
            </div>
          )}

          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-danger" onClick={handleClose} disabled={isSubmitting}>
              Отмена
            </Button>
            <Button variant="outline-success" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Сохраняю..." : "Сохранить изменения"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}