
const express = require("express");
const router = express.Router();
const OpenRouterService = require("../services/OpenRouterService");



router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Пустой запрос" });

  try {
    const reply = await OpenRouterService .ask(message);
    res.json({ reply });
  } catch (err) {
    console.error("Ошибка AI:", err);
    res.status(500).json({ error: "Ошибка генерации" });
  }
});

module.exports = router;
