const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const { verifyAccessToken } = require("../middlewares/verifyTokens");

// ----------- Пользовательские маршруты -----------

router.get("/", verifyAccessToken, OrderController.getAll); 
// Получить все заказы текущего пользователя

router.get("/:id", verifyAccessToken, OrderController.getById); 
// Получить конкретный заказ пользователя

router.post("/", verifyAccessToken, OrderController.create); 
// Создать новый заказ

router.put("/:id", verifyAccessToken, OrderController.update); 
// Обновить заказ (например, изменить описание или статус)

router.delete("/:id", verifyAccessToken, OrderController.delete); 
// Удалить заказ

router.put("/:id/pay", verifyAccessToken, OrderController.pay); 
// Оплатить заказ (меняет статус на "в обработке")


router.put("/admin/:id/status", verifyAccessToken, OrderController.update); 
// Админ меняет статус любого заказа

module.exports = router;
