/* eslint-disable camelcase */
/* eslint-disable no-return-await */
const { Order } = require('../../db/models');

class OrderService {
  // Получить заказы конкретного пользователя
  static async getOrdersByUser(user_id) {
    return await Order.findAll({
      where: { user_id },
      order: [['createdAt', 'DESC']],
    });
  }

  // Получить один заказ конкретного пользователя
  static async getUserOrderById(user_id, order_id) {
    return await Order.findOne({
      where: { id: order_id, user_id },
    });
  }

  // Получить все заказы (для администратора)
  static async getAllOrders() {
    return await Order.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  // Получить заказ по ID без фильтрации по пользователю
  static async getOrderById(id) {
    return await Order.findByPk(id);
  }

  // Создать новый заказ (при оформлении)
  static async createOrder(data) {
    return await Order.create({
      ...data,
      status: 'ожидает оплаты',
    });
  }

  // Обновить заказ (например, при оплате или смене статуса)
  static async updateOrder(id, data) {
    const order = await Order.findByPk(id);
    if (!order) return null;

    // Обновляем только разрешённые поля
    const { status, decs, total } = data;

    return await order.update({
      ...(status && { status }),
      ...(decs && { decs }),
      ...(total && { total }),
      // user_id оставляем как есть!
      user_id: order.user_id,
    });
  }

  // Удалить заказ
  static async deleteOrder(id) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    return await order.destroy();
  }

  static async payOrder(id, userId, isAdmin = false) {
    const where = isAdmin ? { id } : { id, user_id: userId };
    const order = await Order.findOne({ where });

    if (!order) {
      throw new Error('Заказ не найден или недоступен');
    }

    // Меняем статус
    order.status = 'в обработке';
    await order.save();

    return order;
  }
}

module.exports = OrderService;
