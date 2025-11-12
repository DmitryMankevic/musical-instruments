const axios = require("axios");

class OpenRouterService {
  static async ask(songQuery) {
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "deepseek/deepseek-chat",
          messages: [
            {
              role: "system",
              content:
                "Ты музыкальный аналитик. Пользователь вводит название песни и исполнителя. " +
                "Твоя единственная задача — перечислить музыкальные инструменты, использованные в этой композиции. " +
                "Не добавляй комментарии, истории, мнения, переводы и описания. " +
                "Если песня неизвестна, ответь: 'Информация об инструментах недоступна.'",
            },
            {
              role: "user",
              content: songQuery,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "Music Instrument Analyzer",
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.choices[0].message.content.trim();
    } catch (err) {
      console.error("Ошибка OpenRouter API:", err.response?.data || err);
      throw new Error("Ошибка при запросе к OpenRouter API");
    }
  }
}

module.exports = OpenRouterService;
