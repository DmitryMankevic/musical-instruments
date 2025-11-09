import { useEffect, type JSX } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { getCartThunk } from "@/entities/cart/redux/cartThunk";
import { getOrdersThunk } from "@/entities/order/redux/orderThunk";
import styles from "./UserForm.module.css";
import { CLIENT_ROUTES } from "@/shared/enums/client_routes";
import { useNavigate } from "react-router";

interface UserFormProps {
  onClose: () => void;
}

export default function UserForm({ onClose }: UserFormProps): JSX.Element {
  const { user } = useAppSelector((state) => state.user);
  const { orders } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const itemsInCart = useAppSelector((state) =>
    [...(state.cart.cart?.items ?? [])].sort((a, b) => a.id - b.id)
  );

  const totalItems = itemsInCart.reduce(
    (sum, item) => sum + item.CartItem.quantity,
    0
  );

  useEffect(() => {
    dispatch(getCartThunk());
    dispatch(getOrdersThunk());
  }, [dispatch]);

  // Статусы заказов
  const pendingCount = orders.filter((o) => o.status === "в обработке").length;
  const deliveredCount = orders.filter((o) => o.status === "доставлен").length;
  const canceledCount = orders.filter((o) => o.status === "отменен").length;
  const sentCount = orders.filter((o) => o.status === "отправлен").length;

  return (
    <>
      {user?.isAdmin === false && (
        <>
          <div className={styles.headerContainer}>
            <p>
              Добро пожаловать,
              <br /> <strong>{user?.fullName}!</strong>
            </p>
            <div className={styles.cartInfo}>
              <img
                src="/icons/cart.svg"
                alt="cart-icon"
                width={20}
                height={20}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(CLIENT_ROUTES.CART);
                  onClose();
                }}
              />
              <p
                onClick={() => {
                  navigate(CLIENT_ROUTES.CART);
                  onClose();
                }}
              >
                ({totalItems})
              </p>
            </div>
          </div>

          <div className={styles.orderStats}>
            <h4>Статистика заказов:</h4>
            <ul>
              <li>Всего заказов: {orders.length}</li>
              <li>В обработке: {pendingCount}</li>
              <li>Доставлено: {deliveredCount}</li>
              <li>Отменено: {canceledCount}</li>
              <li>Отправлено: {sentCount}</li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}
