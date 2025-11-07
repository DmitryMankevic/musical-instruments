import { useLayoutEffect, type JSX } from "react";
import styles from "./FavouritePage.module.css";

export function FavouritePage(): JSX.Element {
  useLayoutEffect(() => {
    document.title = "Страница избранного";
  }, []);

  return (
    <>
      <h1 className={styles.container}>Страница избранного</h1>
    </>
  );
}
