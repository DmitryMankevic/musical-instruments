import type { JSX } from "react";
import styles from "./ItemCard.module.css";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function ItemCard(): JSX.Element {
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
        <h3 className={styles.title}>Yamaha P-225 B</h3>
        <div className={styles.price}>8 000 P</div>
      </div>
    </div>
  );
}
