const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { verifyRefreshToken } = require('../middlewares/verifyTokens');

// Все маршруты защищены авторизацией

// ----------- Админские маршруты -----------
router.get('/admin/all', verifyRefreshToken, OrderController.getAllForAdmin); // Получить все заказы в системе (админка)

// ----------- Пользовательские маршруты -----------
router.get('/', verifyRefreshToken, OrderController.getAll); // Получить все свои заказы
router.get('/:id', verifyRefreshToken, OrderController.getById); // Получить конкретный заказ по ID
router.post('/', verifyRefreshToken, OrderController.create); // Создать заказ
router.put('/:id', verifyRefreshToken, OrderController.update); // Обновить заказ (например, статус)
router.delete('/:id', verifyRefreshToken, OrderController.delete); // Удалить заказ

module.exports = router;
