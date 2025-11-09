import type { JSX } from "react";
import React, { useState } from "react";
import styles from "./ItemCard.module.css";
import { Heart, X, Check } from "lucide-react";
import type { IItem } from "@/entities/item/model";
import { useAppDispatch } from "@/shared/hooks/hook";
import { addToCartThunk } from "@/entities/cart/redux/cartThunk";

type Props = {
  item: IItem;
  quantity?: number;
};

function ItemCard({ item }: Props): JSX.Element {
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCartThunk({ itemId: item.id, quantity: 1 }));
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {
      console.error("Ошибка при добавлении в корзину:", err);
    }
  };

  const handleImageClick = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  return (
    <>
      {/* КАРТОЧКА */}
      <div className={styles.card}>
        <div className={styles.imageWrapper} onClick={handleImageClick}>
          <span className={styles.badge}>Sale</span>
          <button
            className={styles.heartBtn}
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            aria-label="Like"
          >
            <Heart
              size={20}
              color={liked ? "red" : "gray"}
              fill={liked ? "red" : "none"}
            />
          </button>

          <img
            src={item.img || "/img/yamaha-p225b.png"}
            alt={item.title}
            className={styles.image}
            onError={(e) => {
              e.currentTarget.src = "/img/yamaha-p225b.png";
            }}
          />
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.price}>{item.price} ₽</div>

          <button
            className={`${styles.addButton} ${isAdded ? styles.added : ""}`}
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            {isAdded ? (
              <>
                <Check size={18} /> Добавлено!
              </>
            ) : (
              "Добавить в корзину"
            )}
          </button>
        </div>
      </div>

      {/* МОДАЛЬНОЕ ОКНО */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={closeModal}>
              <X size={20} />
            </button>

            <div className={styles.modalBody}>
              <img
                src={item.img || "/img/yamaha-p225b.png"}
                alt={item.title}
                className={styles.modalImage}
                onError={(e) => {
                  e.currentTarget.src = "/img/yamaha-p225b.png";
                }}
              />

              <div className={styles.modalInfo}>
                <h2 className={styles.modalTitle}>{item.title}</h2>
                <p className={styles.modalDesc}>{item.desc}</p>
                <p className={styles.modalPrice}>{item.price} ₽</p>
                <p className={styles.modalStock}>
                  В наличии: {item.stock} шт.
                </p>
                <p className={styles.modalArticle}>Артикул: {item.article}</p>

                <div className={styles.modalButtons}>
                  <button
                    className={`${styles.modalAddButton} ${
                      isAdded ? styles.added : ""
                    }`}
                    onClick={handleAddToCart}
                    disabled={isAdded}
                  >
                    {isAdded ? (
                      <>
                        <Check size={18} /> Добавлено!
                      </>
                    ) : (
                      "Добавить в корзину"
                    )}
                  </button>

                  <button
                    className={`${styles.modalFavButton} ${
                      liked ? styles.favActive : ""
                    }`}
                    onClick={() => setLiked(!liked)}
                    aria-label="Добавить в избранное"
                  >
                    <Heart
                      size={18}
                      color={liked ? "white" : "#111"}
                      fill={liked ? "red" : "none"}
                    />
                    {liked ? " В избранном" : " В избранное"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(ItemCard);
