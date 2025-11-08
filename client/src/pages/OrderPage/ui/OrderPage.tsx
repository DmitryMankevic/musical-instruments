import { useEffect, type JSX } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { getOrdersThunk } from "@/entities/order/redux/orderThunk";
import styles from "./OrderPage.module.css";

export function OrdersPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { orders, loading, errorMessage } = useAppSelector(
    (state) => state.order
  );

  useEffect(() => {
    document.title = "Мои заказы";
    dispatch(getOrdersThunk());
  }, [dispatch]);

  if (loading) {
    return <div className={styles.loading}>Загрузка заказов...</div>;
  }

  if (errorMessage) {
    return <div className={styles.error}>Ошибка: {errorMessage}</div>;
  }

  if (orders.length === 0) {
    return <div className={styles.empty}>У вас пока нет заказов.</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h1>Мои заказы</h1>
      <div className={styles.list}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.header}>
              <h2>Заказ #{order.id}</h2>
              <span className={styles.status}>{order.status}</span>
            </div>
            <p>Сумма: {Number(order.total).toFixed(2)} ₽</p>

            <p>Описание: {order.decs}</p>
            <p>Создан: {new Date(order.createdAt).toLocaleString("ru-RU")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
