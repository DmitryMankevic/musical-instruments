import { useLayoutEffect, useState, type JSX } from "react";
import { useSearchParams } from "react-router";
import styles from "./ItemsPage.module.css";
import ItemCard from "@/features/CardForm/ItemCard";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { getAllItemsThunk } from "@/entities/item/redux/itemThunk";

export function ItemsPage(): JSX.Element {
  const itemsArr = useAppSelector((state) => state.item.itemArr);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  // начальное значение фильтра из URL
  const initialMarker = searchParams.get("marker") ?? "";

  const [selectedMarker, setSelectedMarker] = useState(initialMarker);
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useLayoutEffect(() => {
    dispatch(getAllItemsThunk());
  }, [dispatch]);

  useLayoutEffect(() => {
    document.title = "Страница товаров";
  }, []);

  // обновляем фильтр, если marker в URL меняется
  useLayoutEffect(() => {
    setSelectedMarker(initialMarker);
  }, [initialMarker]);

  const filteredItems = itemsArr
    .filter((item) => {
      if (selectedMarker && item.marker !== selectedMarker) return false;
      if (maxPrice && item.price > Number(maxPrice)) return false;
      return true;
    })
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <h4>Фильтры</h4>

        <div className={styles.filterGroup}>
          <label htmlFor="category">Категория:</label>
          <select
            id="category"
            value={selectedMarker}
            onChange={(e) => setSelectedMarker(e.target.value)}
          >
            <option value="">Все</option>
            <option value="Hot deals">Hot deals</option>
            <option value="New">New</option>
            <option value="Top-Seller">Top-Seller</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="price">Цена до:</label>
          <input
            id="price"
            type="number"
            placeholder="Введите цену"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : "")
            }
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="sort">Сортировка:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">По возрастанию цены</option>
            <option value="desc">По убыванию цены</option>
          </select>
        </div>

        <button
          className={styles.resetButton}
          onClick={() => {
            setSelectedMarker("");
            setMaxPrice("");
            setSortOrder("asc");
          }}
        >
          Сбросить фильтры
        </button>
      </div>

      <div className={styles.itemsContainer}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <p>Нет товаров по выбранным параметрам</p>
        )}
      </div>
    </div>
  );
}
