import type { JSX } from "react";
import React, { useState } from "react";
import styles from "./ItemCard.module.css";
import { Heart } from "lucide-react";
import type { IItem } from "@/entities/item/model";
import { useAppDispatch } from "@/shared/hooks/hook";
import { addToCartThunk } from "@/entities/cart/redux/cartThunk";

type Props = {
  item: IItem;
  quantity?: number;
};

function ItemCard({ item }: Props): JSX.Element {
  const [liked, setLiked] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddToCart = async () => {
    try {
      // добавляем конкретный товар по ID
      await dispatch(addToCartThunk({ itemId: item.id, quantity: 1 }));

      // временно alert, потом можно заменить на toast
      alert(`Товар "${item.title}" добавлен в корзину`);
    } catch (err) {
      console.error("Ошибка при добавлении в корзину:", err);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <span className={styles.badge}>Sale</span>
        <button
          className={styles.heartBtn}
          onClick={() => setLiked(!liked)}
          aria-label="Like"
        >
          <Heart
            size={20}
            color={liked ? "red" : "gray"}
            fill={liked ? "red" : "none"}
          />
        </button>
        <img
          src="../../public/img/yamaha-p225b.png"
          alt={item?.title || "Инструмент"}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{item?.title}</h3>
        <div className={styles.price}>{item?.price} ₽</div>

        <button className={styles.addButton} onClick={handleAddToCart}>
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}

export default React.memo(ItemCard);
