import { useLayoutEffect, type JSX } from "react";
import styles from "./ItemCardPage.module.css";

export function ItemCardPage(): JSX.Element {
    useLayoutEffect(() => {
      document.title = "Страница товара";
    }, []);
  return (
    <div>
      <h1 className={styles.container}>Страница товара</h1>
    </div>
  );
}
