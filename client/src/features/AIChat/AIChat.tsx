import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AIChat.module.css";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { getAllItemsThunk } from "@/entities/item/redux/itemThunk";
import { addToCartThunk } from "@/entities/cart/redux/cartThunk";
import {
  addItemToFavouritesThunk,
  deleteFavouriteThunk,
} from "@/entities/favourites/redux/favouritesThunk";
import { useNavigate } from "react-router"; 

const AIChat: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 

  const { itemArr } = useAppSelector((state) => state.item);
  const user = useAppSelector((state) => state.user.user);
  const favourites = useAppSelector((state) => state.favourites.items);

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggested, setSuggested] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!itemArr.length) {
      dispatch(getAllItemsThunk({ page: 1, limit: 999 }));
    }
  }, [dispatch, itemArr.length]);

  const normalize = (text: string) => text.toLowerCase().trim();

  const simplifyWord = (word: string): string => {
    const w = normalize(word);
    if (w.startsWith("гитар")) return "гитары";
    if (w.startsWith("ударн")) return "ударные";
    if (w.startsWith("клавиш")) return "клавишные";
    if (w.startsWith("струн")) return "струнные";
    if (w.startsWith("духов")) return "духовые";
    if (w.startsWith("смычк")) return "смычковые";
    if (w.startsWith("синтезатор")) return "синтезаторы";
    return w;
  };

  const categoryCaseMap: Record<string, string> = {
    гитары: "гитар",
    ударные: "ударных",
    клавишные: "клавишных",
    струнные: "струнных",
    духовые: "духовых",
    смычковые: "смычковых",
    синтезаторы: "синтезаторов",
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setReply("");
    setSuggested([]);

    try {
      const res = await axios.post("http://localhost:3000/api/chat", { message });
      const aiReply = res.data.reply?.trim();

      if (!aiReply) {
        setReply("Информация об инструментах недоступна.");
        setShowModal(true);
        setLoading(false);
        return;
      }

      const categories = aiReply
        .split(",")
        .map((c: string) => simplifyWord(c))
        .filter(Boolean);

      const categoryMap: Record<string, number> = {
        гитары: 1,
        ударные: 2,
        клавишные: 3,
        струнные: 4,
        духовые: 5,
        смычковые: 6,
        синтезаторы: 7,
      };

      const selectedItems: any[] = [];

      for (const category of categories) {
        const catId = categoryMap[category];
        if (!catId) continue;

        const item = itemArr.find(
          (i) => Number(i.category_id) === Number(catId)
        );
        if (item) selectedItems.push({ ...item, altFor: category });
      }

      if (selectedItems.length === 0) {
        setReply("Не найдено подходящих инструментов для указанных категорий.");
      } else {
        setReply(
          `В композиции использованы категории: ${categories.join(", ")}.`
        );
      }

      setSuggested(selectedItems);
      setShowModal(true);
    } catch (err) {
      console.error("Ошибка при запросе к AI:", err);
      setReply("Ошибка при обращении к AI-сервису.");
    } finally {
      setLoading(false);
    }
  };

  // добавление в избранное + закрытие модалки + редирект
  const handleToggleFavourite = async () => {
    if (!user) {
      setReply("Пожалуйста, войдите в аккаунт, чтобы добавить в избранное.");
      setShowModal(false);
      return;
    }

    try {
      for (const item of suggested) {
        const isFavourited = favourites.some((f) => f.id === item.id);
        if (isFavourited) {
          await dispatch(deleteFavouriteThunk(item.id));
        } else {
          await dispatch(addItemToFavouritesThunk(item));
        }
      }

      // Закрываем окно и переходим
      setShowModal(false);
      navigate("/favourites");
    } catch (err) {
      console.log("Ошибка избранного:", err);
    }
  };

  // добавление в корзину + закрытие модалки + редирект
  const handleAddToCart = (): void => {
    if (!user) {
      setReply("Пожалуйста, войдите в аккаунт, чтобы добавить товары в корзину.");
      setShowModal(false);
      return;
    }

    suggested.forEach((item) => {
      dispatch(addToCartThunk({ itemId: item.id, quantity: 1 }));
    });

    // Закрываем окно и переходим
    setShowModal(false);
    navigate("/cart");
  };

  const handleRemove = (id: number): void => {
    setSuggested((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.chatBox}>
      <h2>🎵 Определитель инструментов</h2>
      <p className={styles.subtext}>
        Введите исполнителя и название песни, чтобы узнать, какие категории
        инструментов использованы.
      </p>

      <input
        type="text"
        className={styles.input}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Например: The Beatles - Let It Be"
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className={styles.button}
      >
        {loading ? "Анализ..." : "Показать инструменты"}
      </button>

      {reply && (
        <div className={styles.reply}>
          <strong>Результат:</strong>
          <p>{reply}</p>
        </div>
      )}

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Найденные и альтернативные инструменты</h3>

            <div style={{ marginBottom: "15px", textAlign: "left" }}>
              <p>
                <strong>Вы искали композицию:</strong> {message}
              </p>
              <p>
                <strong>Инструменты в композиции:</strong> {reply}
              </p>
              <p>
                <b>Наш магазин может предложить такие инструменты:</b>
              </p>
            </div>

            {suggested.length > 0 ? (
              <ul className={styles.itemList}>
                {suggested.map((item) => (
                  <li key={item.id} className={styles.itemRow}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className={styles.itemImg}
                    />
                    <div className={styles.itemInfo}>
                      <p className={styles.itemTitle}>
                        {item.title}
                        {item.altFor && (
                          <span className={styles.altTag}>
                            вариант для{" "}
                            {categoryCaseMap[item.altFor] || item.altFor}
                          </span>
                        )}
                      </p>
                      <p className={styles.itemPrice}>
                        {Number(item.price).toLocaleString("ru-RU", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        ₽
                      </p>
                    </div>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemove(item.id)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Нет подходящих инструментов.</p>
            )}

            <div className={styles.modalActions}>
              {suggested.length > 0 && (
                <button
                  onClick={handleToggleFavourite}
                  className={styles.addBtn}
                >
                  Добавить в избранное
                </button>
              )}
              {suggested.length > 0 && (
                <button onClick={handleAddToCart} className={styles.addBtn}>
                  Добавить в корзину
                </button>
              )}
              <button
                onClick={() => setShowModal(false)}
                className={styles.cancelBtn}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;
