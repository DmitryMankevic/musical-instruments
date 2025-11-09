import type { JSX } from "react";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { X, Heart } from "lucide-react";
import styles from "./CardForCart.module.css";
import type { IItem } from "@/entities/item/model";
import { useAppDispatch } from "@/shared/hooks/hook";
import { deleteCartThunk, getCartThunk } from "@/entities/cart/redux/cartThunk";

type Props = {
  item: IItem & { CartItem: { quantity: number } };
  onQuantityChange?: (itemId: number, newQuantity: number) => void;
};

function CardForCart({ item, onQuantityChange }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleRemove = async (): Promise<void> => {
    try {
      await dispatch(deleteCartThunk(item.id));
      await dispatch(getCartThunk());
    } catch (err) {
      console.error("Ошибка при удалении из корзины:", err);
    }
  };

  const formatPrice = (value: number): string =>
    value.toLocaleString("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // предотвращаем превышение stock
  const handleIncrease = (): void => {
    if (item.CartItem.quantity < item.stock) {
      onQuantityChange?.(item.id, item.CartItem.quantity + 1);
    } else {
      alert(`Нельзя добавить больше, чем ${item.stock} `);
    }
  };

  const handleDecrease = (): void => {
    if (item.CartItem.quantity > 1) {
      onQuantityChange?.(item.id, item.CartItem.quantity - 1);
    } else {
      onQuantityChange?.(item.id, 0);
    }
  };

  const modal = (
    <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.modalClose}
          onClick={() => setIsModalOpen(false)}
        >
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

            <button
              className={`${styles.modalFavButton} ${
                liked ? styles.favActive : ""
              }`}
              onClick={() => setLiked(!liked)}
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
  );

  return (
    <>
      <div className={styles.card}>
        <button
          className={styles.removeBtn}
          onClick={handleRemove}
          aria-label="Удалить из корзины"
        >
          <X size={18} />
        </button>

        <div className={styles.left}>
          <div
            className={styles.imageWrapper}
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={item.img || "/img/yamaha-p225b.png"}
              alt={item.title}
              className={styles.image}
              onError={(e) => {
                e.currentTarget.src = "/img/yamaha-p225b.png";
              }}
            />
            {liked && (
              <Heart
                className={styles.heartIcon}
                size={18}
                color="red"
                fill="red"
              />
            )}
          </div>

          <div className={styles.info}>
            <h4 className={styles.title}>{item.title}</h4>
            <span className={styles.price}>{formatPrice(item.price)} ₽</span>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.controls}>
            <button onClick={handleDecrease}>−</button>
            <span>{item.CartItem.quantity}</span>
            <button onClick={handleIncrease}>+</button>
          </div>

          <div className={styles.total}>
            {formatPrice(item.price * item.CartItem.quantity)} ₽
          </div>
        </div>
      </div>

      {isModalOpen && createPortal(modal, document.body)}
    </>
  );
}

export default React.memo(CardForCart);
