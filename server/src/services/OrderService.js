/* eslint-disable no-return-await */
/* eslint-disable camelcase */
const { Order } = require("../../db/models");

class OrderService {

  static async getOrdersByUser(user_id) {
    return await Order.findAll({ where: { user_id } }); // для админки
  }

  static async getUserOrderById(user_id, order_id) {
    return await Order.findOne({ where: { id: order_id, user_id } }); // все заказы под юзера
  }

  static async getAllOrders() {
    return Order.findAll();
  }

  static async getOrderById(id) {
    return Order.findByPk(id);
  }
  
  static async createOrder(data) {
    return await Order.create(data);
  }

  static async updateOrder(id, data) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    return await order.update(data);
  }

  static async deleteOrder(id) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    return await order.destroy();
  }
}

module.exports = OrderService;
