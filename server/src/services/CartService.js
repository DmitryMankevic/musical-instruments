const { Cart, CartItem, Item } = require('../../db/models');

class CartService {
  static async getCartByUserId(userId) {
    return Cart.findOne({
      where: { user_id: userId },
      include: [
        {
          model: Item,
          as: 'items',
          through: { attributes: ['quantity'] }, // включает количество из CartItem
        },
      ],
    });
  }

  static async addItem(userId, itemId, quantity = 1) {
    // Найти корзину пользователя или создать новую
    let cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) {
      cart = await Cart.create({ user_id: userId });
    }

    // Проверить, есть ли уже этот товар
    const [cartItem, created] = await CartItem.findOrCreate({
      where: { cart_id: cart.id, item_id: itemId },
      defaults: { quantity },
    });

    if (!created) {
      // Если товар уже есть — обновить количество
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    // Пересчитать total
    await this.recalculateTotal(cart.id);

    return this.getCartByUserId(userId);
  }

  static async updateQuantity(userId, itemId, quantity) {
    // Находим корзину пользователя
    let cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) {
      cart = await Cart.create({ user_id: userId });
    }

    // Ищем товар в корзине
    let cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, item_id: itemId },
    });

    if (cartItem) {
      // Если товар уже есть — обновляем количество
      cartItem.quantity = quantity;
      await cartItem.save();
    } else {
      // Если товара нет — создаём новый CartItem
      await CartItem.create({
        cart_id: cart.id,
        item_id: itemId,
        quantity: quantity ?? 1,
      });
    }

    await this.recalculateTotal(cart.id);
    return this.getCartByUserId(userId);
  }

  static async removeItem(userId, itemId) {
    const cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) throw new Error('Cart not found');

    await CartItem.destroy({
      where: { cart_id: cart.id, item_id: itemId },
    });

    await this.recalculateTotal(cart.id);
    return this.getCartByUserId(userId);
  }

  static async clearCart(userId) {
    const cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) throw new Error('Cart not found');

    await CartItem.destroy({ where: { cart_id: cart.id } });
    cart.total = 0;
    await cart.save();

    return this.getCartByUserId(userId);
  }

  static async recalculateTotal(cartId) {
    const cartItems = await CartItem.findAll({
      where: { cart_id: cartId },
      include: [{ model: Item, as: 'item' }],
    });

    const total = cartItems.reduce(
      (sum, cartItem) =>
        sum + parseFloat(cartItem.quantity) * parseFloat(cartItem.item.price),
      0,
    );

    const cart = await Cart.findByPk(cartId);
    cart.total = total.toFixed(2);
    await cart.save();
  }
}
module.exports = CartService;
