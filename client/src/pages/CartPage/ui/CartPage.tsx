import {
  getCartThunk,
  updateCartItemThunk,
  deleteCartThunk,
} from "@/entities/cart/redux/cartThunk";
import ItemCard from "@/features/CardForm/ItemCard";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { useEffect, type JSX } from "react";
import styles from "./CartPage.module.css";

import { createOrderThunk } from "@/entities/order/redux/orderThunk";
import { useNavigate } from "react-router";

export function CartPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // <-- используем для перехода
  // Получаем корзину из Redux
  const itemsInCart = useAppSelector((state) =>
    [...(state.cart.cart?.items ?? [])].sort((a, b) => a.id - b.id)
  );

  const handleCheckout = async () => {
    try {
      const orderData = {
        total: totalSum,
        status: "новый", // или pending
        decs: "Заказ создан из корзины",
      };

      const resultAction = await dispatch(createOrderThunk(orderData));

      if (createOrderThunk.fulfilled.match(resultAction)) {
        navigate("/orders");
      } else {
        console.error("Ошибка при создании заказа:", resultAction.payload);
      }
    } catch (err) {
      console.error("Ошибка при оформлении заказа:", err);
    }
  };

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

        {/* Кнопка оформления */}
        {itemsInCart.length > 0 && (
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Оформить заказ
          </button>
        )}
      </div>
    </div>
  );
}
