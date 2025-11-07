import { useLayoutEffect, type JSX } from "react";
import styles from "./ProfilePage.module.css";

export function ProfilePage(): JSX.Element {

  useLayoutEffect(() => {
    document.title = "Личный кабинет";
  }, []);

  return (
    <>
      <h1 className={styles.container}>Личный кабинет</h1>
    </>
  );
}
