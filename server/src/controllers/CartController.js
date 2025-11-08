const CartService = require('../services/CartService');
const formatResponse = require('../utils/formatResponse');

class CartController {
  static async getByUser(req, res) {
    try {
      const userId = res.locals.user.id;
      const cart = await CartService.getCartByUserId(userId);
      if (!cart) {
        return res.status(404).json(formatResponse(404, 'Корзины нет'));
      }
      res.json(formatResponse(200, 'Success', cart));
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json(formatResponse(500, 'Internal Server Error', null, err.message));
    }
  }

  static async addItem(req, res) {
    try {
      const userId = res.locals.user.id;
      const { itemId, quantity } = req.body;
      const cart = await CartService.addItem(userId, itemId, quantity);
      res.status(200).json(formatResponse(200, 'Item added', cart));
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json(formatResponse(500, 'Internal Server Error', null, err.message));
    }
  }

  static async updateItem(req, res) {
    try {
      const userId = res.locals.user.id;
      const { itemId } = req.params;
      const { quantity } = req.body;
      const cart = await CartService.updateQuantity(userId, itemId, quantity);
      res.status(200).json(formatResponse(200, 'Quantity updated', cart));
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json(formatResponse(500, 'Internal Server Error', null, err.message));
    }
  }

  static async removeItem(req, res) {
    try {
      const userId = res.locals.user.id;
      const { itemId } = req.params;
      const cart = await CartService.removeItem(userId, itemId);
      res.status(200).json(formatResponse(200, 'Item removed', cart));
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json(formatResponse(500, 'Internal Server Error', null, err.message));
    }
  }

  static async clearCart(req, res) {
    try {
      const userId = res.locals.user.id;
      const cart = await CartService.clearCart(userId);
      res.status(200).json(formatResponse(200, 'Cart cleared', cart));
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json(formatResponse(500, 'Internal Server Error', null, err.message));
    }
  }
}

module.exports = CartController;
