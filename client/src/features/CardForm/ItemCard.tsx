import type { JSX } from "react";
import styles from "./ItemCard.module.css";
import React, { useState } from "react";
import { Heart } from "lucide-react";
import type { IItem } from "../../entities/item/model";

type Props = {
  item?: IItem;
};

function ItemCard({ item }: Props): JSX.Element {
  const [liked, setLiked] = useState(false);

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
          alt="Yamaha P-225 B"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{item?.title}</h3>
        <div className={styles.price}>{item?.price} P</div>
      </div>
    </div>
  );
}

export default React.memo(ItemCard);
