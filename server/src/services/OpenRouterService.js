const axios = require('axios');

class OpenRouterService {
  static async ask(songQuery) {
    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'deepseek/deepseek-chat',
          temperature: 0.6, // немного смягчает ответы, но оставляет логику
          messages: [
            {
              role: 'system',
              content: `
Ты музыкальный аналитик, который точно определяет категории инструментов, использованных в песне.

Пользователь вводит исполнителя и название композиции.
Ты должен определить, какие категории музыкальных инструментов из списка ниже реально использованы в оригинальной студийной версии.

ДОСТУПНЫЕ КАТЕГОРИИ (только они!):
1. Гитары
2. Ударные
3. Клавишные
4. Струнные
5. Духовые
6. Смычковые
7. Синтезаторы

⚙️ Правила:
- Отвечай строго только категориями из этого списка, через запятую.
- Если в песне чётко слышен только один инструмент — укажи ТОЛЬКО одну категорию.
- Не добавляй категории "на всякий случай".
- Если песня неизвестна или невозможно определить инструменты, ответь точно фразой:
  "Информация об инструментах недоступна."

Примеры:
Ввод: Adele — All I Ask
Ответ: Клавишные

Ввод: Queen — We Will Rock You
Ответ: Ударные, Гитары

Ввод: Lady Gaga — Alejandro
Ответ: Синтезаторы, Ударные, Гитары, Смычковые

Ввод: Mozart — Requiem
Ответ: Смычковые, Духовые

Ввод: Три кита — Морской бой
Ответ: Информация об инструментах недоступна.
              `.trim(),
            },
            {
              role: 'user',
              content: songQuery,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'http://localhost:5173',
            'X-Title': 'Music Instrument Analyzer',
            'Content-Type': 'application/json',
          },
        }
      );

      // Извлекаем и чистим ответ
      const content = response.data.choices[0].message.content.trim();
      return content;
    } catch (err) {
      console.error('Ошибка OpenRouter API:', err.response?.data || err);
      throw new Error('Ошибка при запросе к OpenRouter API');
    }
  }
}

module.exports = OpenRouterService;
