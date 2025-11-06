const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

router.get('/:userId', verifyAccessToken, CartController.getByUser);
router.post('/:userId/add', verifyAccessToken, CartController.addItem);
router.put('/:userId/update/:itemId', verifyAccessToken, CartController.updateItem);
router.delete('/:userId/remove/:itemId', verifyAccessToken, CartController.removeItem);
router.delete('/:userId/clear', verifyAccessToken, CartController.clearCart);

module.exports = router;
