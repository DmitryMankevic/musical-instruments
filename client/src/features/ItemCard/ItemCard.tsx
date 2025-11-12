import type { JSX } from "react";
import React, { useState } from "react";
import styles from "./ItemCard.module.css";
import { Heart, X, Check } from "lucide-react";
import type { IItem } from "@/entities/item/model";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { addToCartThunk } from "@/entities/cart/redux/cartThunk";
import {
  addItemToFavouritesThunk,
  deleteFavouriteThunk,
} from "@/entities/favourites/redux/favouritesThunk";
import { createPortal } from "react-dom";

type Props = {
  item: IItem;
  quantity?: number;
};

function ItemCard({ item }: Props): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useAppDispatch();

  const favouriteItems = useAppSelector((state) => state.favourites.items);
  const isFavourited = favouriteItems.some((favItem) => favItem.id === item.id);

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCartThunk({ itemId: item.id, quantity: 1 }));
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {
      console.error("Ошибка при добавлении в корзину:", err);
    }
  };

  const handleToggleFavourite = async () => {
    try {
      if (isFavourited) {
        await dispatch(deleteFavouriteThunk(item.id));
      } else {
        await dispatch(addItemToFavouritesThunk(item));
      }
    } catch (err) {
      console.log("Ошибка избранного:", err);
    }
  };

  const handleImageClick = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  // Поддержка строки и числа для цены
  const formatPrice = (value: number | string): string => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "0.00";
    return num.toLocaleString("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Модальное окно
  const modal = (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={closeModal}>
          <X size={20} />
        </button>

        <div className={styles.modalBody}>
          <img
            src={(item.img || "/img/yamaha-p225b.png").trim()}
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

              {/* Кнопка избранного — синхронизирована с Redux */}
              <button
                className={`${styles.modalFavButton} ${
                  isFavourited ? styles.favActive : ""
                }`}
                onClick={handleToggleFavourite}
                aria-label={
                  isFavourited
                    ? "Удалить из избранного"
                    : "Добавить в избранное"
                }
              >
                <Heart
                  size={18}
                  color={isFavourited ? "white" : "#111"}
                  fill={isFavourited ? "red" : "none"}
                />
                {isFavourited ? " В избранном" : " В избранное"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ОСНОВНАЯ КАРТОЧКА */}
      <div className={styles.card}>
        <div className={styles.imageWrapper} onClick={handleImageClick}>
          {item.marker && <span className={styles.badge}>{item.marker}</span>}

          {/* Кнопка в карточке — тоже через Redux */}
          <button
            className={styles.heartBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavourite();
            }}
            aria-label={
              isFavourited ? "Удалить из избранного" : "Добавить в избранное"
            }
          >
            <Heart
              size={20}
              color={isFavourited ? "red" : "none"}
              fill={isFavourited ? "red" : "none"}
            />
          </button>

          <img
            src={(item.img || "/img/yamaha-p225b.png").trim()}
            alt={item.title}
            className={styles.image}
            onError={(e) => {
              e.currentTarget.src = "/img/yamaha-p225b.png";
            }}
          />
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.price}>{formatPrice(item.price)} ₽</div>

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

      {/* createPortal для модалки */}
      {isModalOpen && createPortal(modal, document.body)}
    </>
  );
}

export default React.memo(ItemCard);

