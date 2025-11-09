import { useEffect, type JSX } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import {
  getOrdersThunk,
  payOrderThunk,
  deleteOrderThunk,
  updateOrderThunk,
} from "@/entities/order/redux/orderThunk";
import styles from "./OrdersPage.module.css";

export function OrdersPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { orders, loading, errorMessage } = useAppSelector(
    (state) => state.order
  );
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    document.title = user?.isAdmin ? "Все заказы" : "Мои заказы";
    dispatch(getOrdersThunk());
  }, [dispatch, user?.isAdmin]);

  const handlePay = (id: number) => {
    dispatch(payOrderThunk(id));
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить заказ?")) {
      dispatch(deleteOrderThunk(id));
    }
  };

  const handleStatusChange = (id: number, status: string) => {
    dispatch(updateOrderThunk({ id, order: { status } }));
  };

  const normalizeStatus = (status: string): string =>
    status.trim().toLowerCase();

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
      <h1>{user?.isAdmin ? "Все заказы" : "Мои заказы"}</h1>

      <div className={styles.list}>
        {orders.map((order) => {
          const normalized = normalizeStatus(order.status);

          return (
            <div key={order.id} className={styles.orderCard}>
              {/* Верхняя часть — название и крестик */}
              <div className={styles.topRow}>
                <h2 className={styles.orderTitle}>Заказ #{order.id}</h2>
                <button
                  className={styles.deleteIcon}
                  onClick={() => handleDelete(order.id)}
                  aria-label="Удалить заказ"
                >
                  ✕
                </button>
              </div>

              {/* Статус под заголовком */}
              <div className={styles.statusRow}>
                <span
                  className={`${styles.status} ${
                    normalized === "в обработке"
                      ? styles.processing
                      : normalized === "доставлен"
                      ? styles.delivered
                      : normalized === "отменён"
                      ? styles.cancelled
                      : normalized === "отправлен"
                      ? styles.sent
                      : normalized === "готов к отправке"
                      ? styles.ready
                      : styles.new
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Основная информация */}
              <div className={styles.infoBlock}>
                <p>Сумма: {Number(order.total).toFixed(2)} ₽</p>
                <p>Описание: {order.decs}</p>
                <p>
                  Создан: {new Date(order.createdAt).toLocaleString("ru-RU")}
                </p>
              </div>

              {/* Нижняя часть — кнопки */}
              <div className={styles.actionsBottom}>
                {!user?.isAdmin && normalized.includes("ожидает") && (
                  <button
                    className={styles.payButton}
                    onClick={() => handlePay(order.id)}
                  >
                    Оплатить заказ
                  </button>
                )}

                {user?.isAdmin && (
                  <div className={styles.adminControls}>
                    <label htmlFor={`status-${order.id}`}>Статус:</label>
                    <select
                      id={`status-${order.id}`}
                      value={normalized}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <option value="ожидает оплаты">Ожидает оплаты</option>
                      <option value="в обработке">В обработке</option>
                      <option value="готов к отправке">Готов к отправке</option>
                      <option value="отправлен">Отправлен</option>
                      <option value="доставлен">Доставлен</option>
                      <option value="отменён">Отменён</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
