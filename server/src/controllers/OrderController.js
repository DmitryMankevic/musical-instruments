const OrderService = require('../services/OrderService');
const formatResponse = require('../utils/formatResponse');

class OrderController {
  // Получить список заказов (все или только свои)
  static async getAll(req, res) {
    try {
      const { id: userId, isAdmin } = res.locals.user;

      const orders = isAdmin
        ? await OrderService.getAllOrders()
        : await OrderService.getOrdersByUser(userId);

      if (!orders || orders.length === 0) {
        return res.status(200).json(formatResponse(204, 'Заказы не найдены', []));
      }

      res.status(200).json(formatResponse(200, 'Список заказов', orders));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при получении заказов', null, message));
    }
  }

  // Получить заказ по ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const { id: userId, isAdmin } = res.locals.user;

      const order = isAdmin
        ? await OrderService.getOrderById(id)
        : await OrderService.getUserOrderById(userId, id);

      if (!order) {
        return res.status(404).json(formatResponse(404, 'Заказ не найден'));
      }

      res.status(200).json(formatResponse(200, 'Заказ найден', order));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при получении заказа', null, message));
    }
  }

  // Создать заказ (статус — ожидает оплаты)
  static async create(req, res) {
    try {
      const userId = res.locals.user.id;
      const data = { ...req.body, user_id: userId };
      const newOrder = await OrderService.createOrder(data);

      res.status(201).json(formatResponse(201, 'Заказ создан', newOrder));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при создании заказа', null, message));
    }
  }

  // Оплатить заказ (меняет статус на "в обработке")
  static async pay(req, res) {
    try {
      const { id } = req.params;
      const userId = res.locals.user.id;

      const order = await OrderService.getUserOrderById(userId, id);
      if (!order) {
        return res.status(404).json(formatResponse(404, 'Заказ не найден'));
      }

      if (order.status !== 'ожидает оплаты') {
        return res
          .status(400)
          .json(formatResponse(400, 'Заказ уже оплачен или не требует оплаты'));
      }

      const updatedOrder = await OrderService.updateOrder(id, {
        status: 'в обработке',
      });

      res.status(200).json(formatResponse(200, 'Заказ успешно оплачен', updatedOrder));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при оплате заказа', null, message));
    }
  }

  // Обновить заказ (например, админ меняет статус)
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { id: userId, isAdmin } = res.locals.user;
      const { status, ...rest } = req.body;

      // Проверяем, кто обновляет заказ
      const order = isAdmin
        ? await OrderService.getOrderById(id)
        : await OrderService.getUserOrderById(userId, id);

      if (!order) {
        return res
          .status(404)
          .json(formatResponse(404, 'Заказ не найден или недоступен'));
      }

      // Только админ может менять статус
      if (status && !isAdmin) {
        return res
          .status(403)
          .json(formatResponse(403, 'Изменять статус может только админ'));
      }

      // Проверяем корректность статуса, если он передан
      const validStatuses = [
        'ожидает оплаты',
        'в обработке',
        'готов к отправке',
        'отправлен',
        'доставлен',
        'отменён',
      ];

      if (status && !validStatuses.includes(status)) {
        return res.status(400).json(formatResponse(400, 'Недопустимый статус'));
      }

      // Обновляем заказ, не затирая user_id
      const updatedOrder = await OrderService.updateOrder(id, {
        ...rest,
        ...(status && { status }),
        user_id: order.user_id, // ← сохраняем владельца
      });

      return res.status(200).json(formatResponse(200, 'Заказ обновлён', updatedOrder));
    } catch ({ message }) {
      console.error('Ошибка при обновлении заказа:', message);
      return res
        .status(500)
        .json(formatResponse(500, 'Ошибка при обновлении заказа', null, message));
    }
  }

  // Удалить заказ (только если не оплачен)
  // Удалить заказ
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const { id: userId, isAdmin } = res.locals.user;

      // Найдём заказ
      const order = await OrderService.getOrderById(id);

      if (!order) {
        return res.status(404).json(formatResponse(404, 'Заказ не найден'));
      }

      // Проверка доступа
      if (!isAdmin && order.user_id !== userId) {
        return res
          .status(403)
          .json(formatResponse(403, 'Удалять можно только свои заказы'));
      }

      await OrderService.deleteOrder(id);

      return res.status(200).json(formatResponse(200, 'Заказ успешно удалён', id));
    } catch (error) {
      console.error('Ошибка при удалении заказа:', error);
      return res
        .status(500)
        .json(formatResponse(500, 'Ошибка при удалении заказа', null, error.message));
    }
  }

  static async pay(req, res) {
    try {
      const { id } = req.params;
      const { isAdmin } = res.locals.user;
      const userId = res.locals.user.id;

      const updatedOrder = await OrderService.payOrder(id, userId, isAdmin);
      res
        .status(200)
        .json(
          formatResponse(
            200,
            'Заказ успешно оплачен (статус: в обработке)',
            updatedOrder,
          ),
        );
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, 'Ошибка при оплате заказа', null, message));
    }
  }
}

module.exports = OrderController;
