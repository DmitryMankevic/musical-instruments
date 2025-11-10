import React, { useState } from "react";
import axios from "axios";
import styles from "./AIChat.module.css";

const AIChat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/chat", { message });
      setReply(res.data.reply);
    } catch (err) {
      console.error("Ошибка при общении с AI:", err);
      setReply("Ошибка запроса к AI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatBox}>
      <h2>🤘 AI Рокер-помощник</h2>
      <textarea
        rows={4}
        className={styles.textarea}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Спроси у AI Рокера что-нибудь..."
      />
      <button onClick={sendMessage} disabled={loading} className={styles.button}>
        {loading ? "Отправка..." : "Отправить"}
      </button>

      {reply && (
        <div className={styles.reply}>
          <strong>Ответ:</strong>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
};

export default AIChat;
