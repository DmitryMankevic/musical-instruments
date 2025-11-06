const OrderService = require('../services/OrderService');
const formatResponse = require('../utils/formatResponse');

class OrderController {
  // Получить все заказы текущего пользователя
  static async getAll(req, res) {
    try {
      const userId = res.locals.user.id;
      const orders = await OrderService.getOrdersByUser(userId);

      if (!orders || orders.length === 0) {
        return res.status(200).json(formatResponse(204, 'У вас пока нет заказов', []));
      }

      res.status(200).json(formatResponse(200, 'Заказы пользователя', orders));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка сервера при получении заказов', null, message));
    }
  }

  // Получить все заказы (для админки)
static async getAllForAdmin(req, res) {
  try {
    const { isAdmin } = res.locals.user;

    if (!isAdmin) {
      return res
        .status(403)
        .json(formatResponse(403, 'Доступ только для администратора', null));
    }

    const orders = await OrderService.getAllOrders();

    if (!orders.length) {
      return res
        .status(200)
        .json(formatResponse(204, 'Нет заказов в системе', []));
    }

    res
      .status(200)
      .json(formatResponse(200, 'Все заказы получены', orders));
  } catch ({ message }) {
    res
      .status(500)
      .json(formatResponse(500, 'Ошибка сервера при получении заказов', null, message));
  }
}


  // Получить один заказ по ID
  static async getById(req, res) {
    try {
      const userId = res.locals.user.id;
      const { id } = req.params;

      const order = await OrderService.getUserOrderById(userId, id);
      if (!order) {
        return res.status(404).json(formatResponse(404, 'Заказ не найден'));
      }

      res.status(200).json(formatResponse(200, 'Заказ успешно получен', order));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка сервера при получении заказа', null, message));
    }
  }

  // Создать заказ
  static async create(req, res) {
    try {
      const userId = res.locals.user.id;
      const data = { ...req.body, userId };
      const newOrder = await OrderService.createOrder(data);

      res.status(201).json(formatResponse(201, 'Заказ успешно создан', newOrder));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при создании заказа', null, message));
    }
  }

  // Обновить заказ (например, изменить статус)
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { isAdmin, id: userId } = res.locals.user;

      let order;

      if (isAdmin) {
        order = await OrderService.getOrderById(id); // админ получает любой заказ
      } else {
        order = await OrderService.getUserOrderById(userId, id); // обычный юзер — только свой
      }

      if (!order) {
        res
          .status(403)
          .json(formatResponse(403, 'Нет доступа к заказу или заказ не найден'));
      }

      const updatedOrder = await OrderService.updateOrder(id, req.body);
      res.status(200).json(formatResponse(200, 'Заказ обновлён', updatedOrder));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при обновлении заказа', null, message));
    }
  }

  // Удалить заказ
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const { isAdmin, id: userId } = res.locals.user;

      let order;

      if (isAdmin) {
        order = await OrderService.getOrderById(id);
      } else {
        order = await OrderService.getUserOrderById(userId, id);
      }

      if (!order) {
        res
          .status(403)
          .json(formatResponse(403, 'Нет доступа к заказу или заказ не найден'));
      }

      const deletedOrder = await OrderService.deleteOrder(id);
      res.status(200).json(formatResponse(200, 'Заказ успешно удалён', deletedOrder));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при удалении заказа', null, message));
    }
  }
}

module.exports = OrderController;
