const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

router.get('/', verifyAccessToken, CartController.getByUser);
router.post('/add', verifyAccessToken, CartController.addItem);
router.put('/update/:itemId', verifyAccessToken, CartController.updateItem);
router.delete('/remove/:itemId', verifyAccessToken, CartController.removeItem);
router.delete('/clear', verifyAccessToken, CartController.clearCart);

module.exports = router;
