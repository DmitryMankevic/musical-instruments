import type { JSX } from "react";
import React, { useState } from "react";
import { X, ShoppingCart, Check } from "lucide-react";
import styles from "./FavouriteCard.module.css";
import type { IItem } from "@/entities/item/model";
import { useAppDispatch } from "@/shared/hooks/hook";
import { addToCartThunk } from "@/entities/cart/redux/cartThunk";
import { deleteFavouriteThunk } from "@/entities/favourites/redux/favouritesThunk";

type Props = {
  item: IItem;
};

function FavouriteCard({ item }: Props): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const dispatch = useAppDispatch();

  const handleRemoveFromFavourites = async () => {
    try {
      await dispatch(deleteFavouriteThunk(item.id));
    } catch (err) {
      console.error("Ошибка при удалении из избранного:", err);
    }
  };

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCartThunk({ itemId: item.id, quantity: 1 }));
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    } catch (err) {
      console.error("Ошибка при добавлении в корзину:", err);
    }
  };

  const handleImageClick = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  // Форматирование цены (как в корзине)
  const formatPrice = (value: number | string): string => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return num.toLocaleString("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Модальное окно — стили и структура как в CardForCart
  const modal = (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
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
            <p className={styles.modalPrice}>{formatPrice(item.price)} ₽</p>
            <p className={styles.modalStock}>В наличии: {item.stock} шт.</p>
            <p className={styles.modalArticle}>Артикул: {item.article}</p>

            <div className={styles.modalButtons}>
              <button
                className={`${styles.modalAddButton} ${
                  isAddedToCart ? styles.added : ""
                }`}
                onClick={handleAddToCart}
                disabled={isAddedToCart}
              >
                {isAddedToCart ? (
                  <>
                    <Check size={18} /> Добавлено!
                  </>
                ) : (
                  "Добавить в корзину"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.card}>
        <button
          className={styles.removeBtn}
          onClick={handleRemoveFromFavourites}
          aria-label="Удалить из избранного"
        >
          <X size={18} />
        </button>

        <div className={styles.left} onClick={handleImageClick}>
          <img
            src={item.img || "/img/yamaha-p225b.png"}
            alt={item.title}
            className={styles.image}
            onError={(e) => {
              e.currentTarget.src = "/img/yamaha-p225b.png";
            }}
          />
          <div className={styles.info}>
            <h4 className={styles.title}>{item.title}</h4>
            <span className={styles.price}>{formatPrice(item.price)} ₽</span>
          </div>
        </div>

        <div className={styles.right}>
          <button
            className={`${styles.addToCartBtn} ${isAddedToCart ? styles.added : ""}`}
            onClick={handleAddToCart}
            disabled={isAddedToCart}
          >
            {isAddedToCart ? (
              <>
                <Check size={16} /> Добавлено!
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> В корзину
              </>
            )}
          </button>
        </div>
      </div>

      {isModalOpen && modal}
    </>
  );
}

export default React.memo(FavouriteCard);