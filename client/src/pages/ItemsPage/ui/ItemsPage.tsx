import { useLayoutEffect, type JSX } from "react";
import styles from "./ItemsPage.module.css";
import ItemCard from "@/features/CardForm/ItemCard";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { getAllItemsThunk } from "@/entities/item/redux/itemThunk";

export function ItemsPage(): JSX.Element {
  const itemsArr = useAppSelector((state) => state.item.itemArr);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getAllItemsThunk());
  }, [dispatch]);

  useLayoutEffect(() => {
    document.title = "Страница товаров";
  }, []);



  return (
    <>
      <h1 className={styles.container}>Страница товаров</h1>
      <div className={styles.itemsContainer}>
        {itemsArr.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
