import React, { useState } from "react";
import axios from "axios";
import styles from "./AIChat.module.css";

const AIChat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const userInput = message.trim();

    // Проверяем, что пользователь что-то ввёл
    if (!userInput) return;

    // Проверяем правильный формат: "Исполнитель - Песня"
    if (!userInput.includes("-")) {
      setReply(
        "Пожалуйста, укажите исполнителя и название песни через тире.\nНапример: 'Queen - Bohemian Rhapsody'."
      );
      return;
    }

    // Проверяем, чтобы не было слишком длинного текста
    if (userInput.length > 100) {
      setReply("Запрос слишком длинный. Укажите только исполнителя и песню.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/chat", { message: userInput });
      setReply(res.data.reply);
    } catch (err) {
      console.error("Ошибка при общении с AI:", err);
      setReply("Ошибка при запросе к музыкальному анализатору.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatBox}>
      <h2>🎵 Определитель инструментов</h2>
      <p className={styles.helperText}>
        Введите исполнителя и название песни, чтобы узнать, какие инструменты использованы.
      </p>

      <textarea
        rows={3}
        className={styles.textarea}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Например: The Beatles - Let It Be"
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className={styles.button}
      >
        {loading ? "Анализирую..." : "Показать инструменты"}
      </button>

      {reply && (
        <div className={styles.reply}>
          <strong>Результат:</strong>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
};

export default AIChat;
