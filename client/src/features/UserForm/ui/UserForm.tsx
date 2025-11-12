import { useEffect, useState, type JSX } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { getCartThunk } from "@/entities/cart/redux/cartThunk";
import { getOrdersThunk } from "@/entities/order/redux/orderThunk";
import {
  getUserInfoByUserIdThunk,
  updateUserInfoThunk,
  createUserInfoThunk,
} from "@/entities/user-info/redux/userInfoThunk";
import styles from "./UserForm.module.css";
import { CLIENT_ROUTES } from "@/shared/enums/client_routes";
import { useNavigate } from "react-router";
import AIChat from "@/features/AIChat/AIChat";

interface UserFormProps {
  onClose: () => void;
}

export default function UserForm({ onClose }: UserFormProps): JSX.Element {
  const { user } = useAppSelector((state) => state.user);
  const { orders } = useAppSelector((state) => state.order);
  const { currentUserInfo } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    country: "",
    city: "",
    address: "",
    birthDay: "",
  });

  useEffect(() => {
    dispatch(getCartThunk());
    dispatch(getOrdersThunk());
    dispatch(getUserInfoByUserIdThunk());
  }, [dispatch]);

  useEffect(() => {
    if (currentUserInfo) {
      setFormData({
        phoneNumber: currentUserInfo.phoneNumber ?? "",
        country: currentUserInfo.country ?? "",
        city: currentUserInfo.city ?? "",
        address: currentUserInfo.address ?? "",
        birthDay: currentUserInfo.birthDay
          ? currentUserInfo.birthDay.split("T")[0]
          : "",
      });
    }
  }, [currentUserInfo]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (): Promise<void> => {
    if (currentUserInfo) {
      await dispatch(updateUserInfoThunk(formData));
    } else {
      await dispatch(createUserInfoThunk(formData));
    }
    setIsModalOpen(false);
  };

  const itemsInCart = useAppSelector((state) =>
    [...(state.cart.cart?.items ?? [])].sort((a, b) => a.id - b.id)
  );

  const totalItems = itemsInCart.reduce(
    (sum, item) => sum + item.CartItem.quantity,
    0
  );

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
              <p>({totalItems})</p>
            </div>
          </div>

          <div className={styles.userInfo}>
            {!currentUserInfo && (<p>Пожалуйста, заполните ваши данные.</p>)}
            <h4>Ваши данные:</h4>
            <p>Телефон: {currentUserInfo?.phoneNumber || "—"}</p>
            <p>Страна: {currentUserInfo?.country || "—"}</p>
            <p>Город: {currentUserInfo?.city || "—"}</p>
            <p>Адрес: {currentUserInfo?.address || "—"}</p>
            <p>Дата рождения: {currentUserInfo?.birthDay?.split("T")[0] || "—"}</p>
            <button
              className="btn btn-outline-dark w-100 mt-2"
              onClick={() => setIsModalOpen(true)}
            >
              {currentUserInfo ? "Изменить данные" : "Добавить данные"}
            </button>
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

          <div className={styles.aiBlock}>
            <AIChat />
          </div>

          <button
            className="btn btn-outline-dark w-100 mt-3"
            onClick={() => {
              navigate(CLIENT_ROUTES.ORDER);
              onClose();
            }}
          >
            Мои заказы
          </button>
          <br />
        </>
      )}
      {user?.isAdmin && (
        <>
        <button
          className="btn btn-outline-dark w-100 mt-3"
          onClick={() => {
            navigate(CLIENT_ROUTES.ADMIN);
            onClose();
          }}
        >
          Админка
        </button>
        <br />
        </>

      )}

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setIsModalOpen(false)}>
              ×
            </button>
            <h3>{currentUserInfo ? "Изменить данные" : "Добавить данные"}</h3>

            <form className={styles.modalForm}>
              <input
                name="phoneNumber"
                placeholder="Телефон"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <input
                name="country"
                placeholder="Страна"
                value={formData.country}
                onChange={handleInputChange}
              />
              <input
                name="city"
                placeholder="Город"
                value={formData.city}
                onChange={handleInputChange}
              />
              <input
                name="address"
                placeholder="Адрес"
                value={formData.address}
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="birthDay"
                placeholder="Дата рождения"
                value={formData.birthDay}
                onChange={handleInputChange}
              />

              <button
                type="button"
                className="btn btn-dark mt-3 w-100"
                onClick={handleSave}
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
