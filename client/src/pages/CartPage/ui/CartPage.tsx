import {
  getCartThunk,
  updateCartItemThunk,
  deleteCartThunk,
} from "@/entities/cart/redux/cartThunk";
import CardForCart from "@/features/CardForCart/ui/CardForCart";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { useEffect, type JSX } from "react";
import styles from "./CartPage.module.css";
import { createOrderThunk } from "@/entities/order/redux/orderThunk";
import { useNavigate } from "react-router";

export function CartPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const itemsInCart = useAppSelector((state) =>
    [...(state.cart.cart?.items ?? [])].sort((a, b) => a.id - b.id)
  );

  useEffect(() => {
    document.title = "Корзина";
    dispatch(getCartThunk());
  }, [dispatch]);

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      await dispatch(deleteCartThunk(itemId));
    } else {
      await dispatch(updateCartItemThunk({ itemId, quantity: newQuantity }));
    }
    dispatch(getCartThunk());
  };

  const handleCheckout = async (): Promise<void> => {
    try {
      const totalSum = itemsInCart.reduce(
        (sum, item) => sum + item.CartItem.quantity * item.price,
        0
      );
      const orderData = {
        total: totalSum,
        status: "новый",
        decs: "Заказ создан из корзины",
      };
      const result = await dispatch(createOrderThunk(orderData));
      if (createOrderThunk.fulfilled.match(result)) {
        navigate("/orders");
      }
    } catch (err) {
      console.error("Ошибка при оформлении заказа:", err);
    }
  };

  const totalItems = itemsInCart.reduce(
    (sum, item) => sum + item.CartItem.quantity,
    0
  );

  const totalSum = itemsInCart.reduce(
    (sum, item) => sum + item.CartItem.quantity * item.price,
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.cartBlock}>
        <h2 className={styles.title}>Корзина</h2>
        <p className={styles.subtitle}>{totalItems} товара</p>

        {itemsInCart.length ? (
          itemsInCart.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <CardForCart
                item={item}
                onQuantityChange={handleQuantityChange}
              />
            </div>
          ))
        ) : (
          <p className={styles.empty}>Корзина пуста</p>
        )}
      </div>

      <div className={styles.summary}>
        <h3>Итого:</h3>
        <p>
          Товары: <b>{totalItems}</b>
        </p>
        <p>
          Сумма: <b>{totalSum.toLocaleString("ru-RU")} ₽</b>
        </p>
        <button className={styles.orderBtn} onClick={handleCheckout}>
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
