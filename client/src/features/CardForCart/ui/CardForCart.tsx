import type { JSX } from "react";
import React from "react";
import { X } from "lucide-react";
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

  const handleRemove = async (): Promise<void> => {
    try {
      await dispatch(deleteCartThunk(item.id));
      await dispatch(getCartThunk());
    } catch (err) {
      console.error("Ошибка при удалении из корзины:", err);
    }
  };

  // форматирование цены по-русски
  const formatPrice = (value: number): string =>
    value.toLocaleString("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.imageWrapper}>
          <img
            src={item.img || "/img/yamaha-p225b.png"}
            alt={item.title}
            className={styles.image}
            onError={(e) => {
              e.currentTarget.src = "/img/yamaha-p225b.png";
            }}
          />
        </div>

        <div className={styles.info}>
          <h4 className={styles.title}>{item.title}</h4>
          <span className={styles.price}>{formatPrice(item.price)} ₽</span>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.controls}>
          <button
            onClick={() =>
              onQuantityChange?.(item.id, item.CartItem.quantity - 1)
            }
          >
            −
          </button>
          <span>{item.CartItem.quantity}</span>
          <button
            onClick={() =>
              onQuantityChange?.(item.id, item.CartItem.quantity + 1)
            }
          >
            +
          </button>
        </div>

        <div className={styles.total}>
          {formatPrice(item.price * item.CartItem.quantity)} ₽
        </div>

        <button
          className={styles.removeBtn}
          onClick={handleRemove}
          aria-label="Удалить из корзины"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default React.memo(CardForCart);
