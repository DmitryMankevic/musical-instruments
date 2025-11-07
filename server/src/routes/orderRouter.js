const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

// Все маршруты защищены авторизацией

// ----------- Админские маршруты -----------
router.get('/admin/all', verifyAccessToken, OrderController.getAllForAdmin); // Получить все заказы в системе (админка)

// ----------- Пользовательские маршруты -----------
router.get('/', verifyAccessToken, OrderController.getAll); // Получить все свои заказы
router.get('/:id', verifyAccessToken, OrderController.getById); // Получить конкретный заказ по ID
router.post('/', verifyAccessToken, OrderController.create); // Создать заказ
router.put('/:id', verifyAccessToken, OrderController.update); // Обновить заказ (например, статус)
router.delete('/:id', verifyAccessToken, OrderController.delete); // Удалить заказ

module.exports = router;
