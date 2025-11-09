import ItemCard from "@/features/ItemCard/ItemCard";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { useEffect, useLayoutEffect, type JSX } from "react";
import styles from "./CategoryPage.module.css";
import { useParams } from "react-router";
import { getCategoryByIdThunk } from "@/entities/category/redux/categoryThunk";

export function CategoryPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const categoryId = Number(id);

  const dispatch = useAppDispatch();

  const category = useAppSelector((state) => state.categories.currentCategory);

  const categoryName = category?.name;
  const itemsArr = category?.items || [];

  useEffect(() => {
    if (!isNaN(categoryId)) {
      dispatch(getCategoryByIdThunk(categoryId));
    }
  }, [dispatch, categoryId]);

  useLayoutEffect(() => {
    document.title = `Товары категории: ${categoryName}`;
  }, [categoryName]);

  return (
    <>
      <h3 className={styles.container}>Товары категории "{categoryName}"</h3>
      <div className={styles.itemsContainer}>
        {itemsArr.length > 0 ? (
          itemsArr.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <p className={styles.noItems}>Товары в данной категории не найдены</p>
        )}
      </div>
    </>
  );
}
