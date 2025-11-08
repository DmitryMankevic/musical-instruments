import {
  getCartThunk,
  updateCartItemThunk,
  deleteCartThunk,
} from "@/entities/cart/redux/cartThunk";
import ItemCard from "@/features/CardForm/ItemCard";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { useEffect, type JSX } from "react";
import styles from "./CartPage.module.css";

export function CartPage(): JSX.Element {
  const dispatch = useAppDispatch();

  // Получаем корзину из Redux
  const itemsInCart = useAppSelector((state) =>
    [...(state.cart.cart?.items ?? [])].sort((a, b) => a.id - b.id)
  );

  // Загружаем корзину при загрузке страницы
  useEffect(() => {
    document.title = "Страница корзины";
    dispatch(getCartThunk());
  }, [dispatch]);

  // Обработка изменения количества товара
  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      await dispatch(deleteCartThunk(itemId));
    } else {
      await dispatch(updateCartItemThunk({ itemId, quantity: newQuantity }));
    }
    // После любого изменения можно аккуратно обновить корзину (если нужно с сервера)
    dispatch(getCartThunk());
  };

  // Подсчёт итогов
  const totalItems = itemsInCart.reduce(
    (sum, item) => sum + item.CartItem.quantity,
    0
  );

  const totalSum = itemsInCart.reduce(
    (sum, item) =>
      sum + item.CartItem.quantity * parseFloat(String(item.price)),
    0
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.items}>
        {itemsInCart.length ? (
          itemsInCart.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <ItemCard item={item} quantity={item.CartItem.quantity} />
              <div className={styles.controls}>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.CartItem.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{item.CartItem.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.CartItem.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Корзина пуста</p>
        )}
      </div>

      <div className={styles.summary}>
        <h2>Итого</h2>
        <p>Количество товаров: {totalItems}</p>
        <p>Сумма: {totalSum.toFixed(2)}₽</p>
      </div>
    </div>
  );
}
