import { useState, type JSX } from "react";
import style from "../AdminPage.module.css";
import type { IOrder } from "@/entities/order/model";
import { useAppDispatch } from "@/shared/hooks/hook";
import {
  deleteOrderThunk,
  updateOrderThunk,
} from "@/entities/order/redux/orderThunk";

interface Props {
  orders: IOrder[];
  loading: boolean;
}

export default function OrdersTable({ orders, loading }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  // локальное состояние для раскрытия
  const [openOrderId, setOpenOrderId] = useState<number | null>(null);

  const toggleOrder = (id: number): void => {
    setOpenOrderId((prev) => (prev === id ? null : id));
  };

  const handleStatusChange = (order: IOrder, status: string): void => {
    dispatch(updateOrderThunk({ id: order.id, order: { status } }));
  };

  const handleDelete = (id: number): void => {
    if (confirm("Удалить заказ?")) {
      dispatch(deleteOrderThunk(id));
    }
  };

  if (loading) return <p>⏳ Загружаем заказы...</p>;
  if (!orders.length) return <p>Заказов пока нет.</p>;

  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Пользователь</th>
          <th>Дата</th>
          <th>Описание</th>
          <th>Сумма</th>
          <th>Статус</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {orders.map((o) => (
          <>
            {/* === ОСНОВНАЯ СТРОКА ЗАКАЗА === */}
            <tr key={o.id}>
              <td>
                <button
                  className={style.iconBtn}
                  onClick={() => toggleOrder(o.id)}
                >
                  {openOrderId === o.id ? "▲" : "▼"}
                </button>
              </td>

              <td>{o.id}</td>
              <td>{o.user_id}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>{o.decs}</td>
              <td>{o.total} ₽</td>

              <td>
                <select
                  value={o.status}
                  onChange={(e) => handleStatusChange(o, e.target.value)}
                >
                  <option value="новый">Ожидает оплаты</option>
                  <option value="в обработке">В обработке</option>
                  <option value="отправлен">Отправлен</option>
                  <option value="доставлен">Доставлен</option>
                  <option value="отменён">Отменён</option>
                </select>
              </td>

              <td>
                <button
                  onClick={() => handleDelete(o.id)}
                  className={style.addBtn}
                >
                  Удалить
                </button>
              </td>
            </tr>

            {/* === РАСКРЫВАЮЩИЙСЯ БЛОК ТОВАРОВ === */}
            {openOrderId === o.id && (
              <tr className={style.orderProductsRow}>
                <td colSpan={8}>
                  <div className={style.orderProductsBox}>
                    <h4>Товары в заказе:</h4>

                    {!o.items || o.items.length === 0 ? (
                      <p className={style.noItems}>В этом заказе нет товаров</p>
                    ) : (
                      <table className={style.table}>
                        <thead>
                          <tr>
                            <th>Фото</th>
                            <th>Название</th>
                            <th>Цена</th>
                            <th>Кол-во</th>
                          </tr>
                        </thead>
                        <tbody>
                          {o.items.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <img src={item.img} alt={item.title} />
                              </td>
                              <td>{item.title}</td>
                              <td>{item.price} ₽</td>
                              <td>{item.OrderItem?.quantity ?? 1}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
}
