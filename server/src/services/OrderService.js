/* eslint-disable camelcase */
/* eslint-disable no-return-await */
const { Order, Item, OrderItem } = require('../../db/models');

class OrderService {
  // Заказы конкретного пользователя
  static async getOrdersByUser(user_id) {
    return await Order.findAll({
      where: { user_id },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Item,
          as: 'items',
          through: {
            model: OrderItem,
            attributes: ['quantity'], // количество товара в заказе
          },
        },
      ],
    });
  }

  // Получить один заказ конкретного пользователя
  static async getUserOrderById(user_id, order_id) {
    return await Order.findOne({
      where: { id: order_id, user_id },
      include: [
        {
          model: Item,
          as: 'items',
          through: {
            model: OrderItem,
            attributes: ['quantity'],
          },
        },
      ],
    });
  }

  // Получить все заказы (для администратора)
  static async getAllOrders() {
    return await Order.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Item,
          as: 'items',
          through: {
            model: OrderItem,
            attributes: ['quantity'],
          },
        },
      ],
    });
  }

  // Получить заказ по ID без фильтрации по пользователю
  static async getOrderById(id) {
    return await Order.findByPk(id, {
      include: [
        {
          model: Item,
          as: 'items',
          through: {
            model: OrderItem,
            attributes: ['quantity'],
          },
        },
      ],
    });
  }

  // Создать новый заказ (при оформлении)
  static async createOrder(data) {
    const { items, ...orderData } = data;

    // 1. создаём заказ
    const order = await Order.create({
      ...orderData,
      status: 'ожидает оплаты',
    });

    // 2. если есть товары — добавляем их в OrderItems
    if (items && Array.isArray(items)) {
      await Promise.all(
        items.map(({ item_id, quantity }) =>
          OrderItem.create({
            order_id: order.id,
            item_id,
            quantity,
          }),
        ),
      );
    }

    // 3. возвращаем заказ с товарами
    return await Order.findByPk(order.id, {
      include: [
        {
          model: Item,
          as: 'items',
          through: {
            model: OrderItem,
            attributes: ['quantity'],
          },
        },
      ],
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
