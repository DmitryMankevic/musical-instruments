const ItemService = require('../services/ItemService');
const formatResponse = require('../utils/formatResponse');
const { Item } = require('../../db/models');

class ItemController {
  // checked
  static async getAllItems(req, res) {
    try {
      // получаем параметры из query
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;

      // запрашиваем у сервиса данные
      const { items, total } = await ItemService.getAllItems(page, limit);

      return res.json(
        formatResponse(200, 'Товары успешно получены', {
          items,
          total,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
        }),
      );
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json(formatResponse(500, 'Произошла ошибка при получении товаров'));
    }
  }

  // checked
  static async createItem(req, res) {
    if (!req.body) return res.status(400).json(formatResponse(400, 'Нет данных'));
    const { title, desc, price, marker, stock, article, img, category_id } = req.body;
    const { isValid, error } = Item.validate({
      title,
      desc,
      price,
      marker,
      stock,
      article,
      img,
      category_id,
    });
    if (!isValid)
      return res.status(400).json(formatResponse(400, 'Ошибка валидации', null, error));
    try {
      const newItem = await ItemService.createItem({
        title,
        desc,
        price,
        marker,
        stock,
        article,
        img,
        category_id,
      });
      return res.status(201).json(formatResponse(201, 'Товар успешно создан', newItem));
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json(formatResponse(500, 'Произошла ошибка при создании товара'));
    }
  }

  // checked
  static async getItemById(req, res) {
    try {
      const item = await ItemService.getItemById(req.params.id);
      if (!item) {
        return res.json(formatResponse(404, 'Товар не найден'));
      }
      return res.json(formatResponse(200, 'Товар успешно получен', item));
    } catch (err) {
      console.log(err);
      return res.json(formatResponse(500, 'Произошла ошибка при получении товара'));
    }
  }

  static async updateItem(req, res) {
    if (!req.body) return res.status(400).json(formatResponse(400, 'Заполните данные'));
    const { title, desc, price, marker, stock, article, img, category_id } = req.body;
    const { isValid, error } = Item.validate({
      title,
      desc,
      price,
      marker,
      stock,
      article,
      img,
      category_id,
    });
    if (!isValid)
      return res.status(400).json(formatResponse(400, 'Ошибка валидации', null, error));
    const { id } = req.params;
    try {
      const updated = await ItemService.updateItem(id, {
        title,
        desc,
        price,
        marker,
        stock,
        article,
        img,
        category_id,
      });
      if (!updated) {
        return res.json(formatResponse(400, 'Товар не найден'));
      }
      return res.json(formatResponse(200, 'Товар успешно обновлён', updated));
    } catch (err) {
      console.log(err);
      return res.json(formatResponse(500, 'Произошла ошибка при обновлении товара'));
    }
  }

  static async deleteItem(req, res) {
    try {
      const deleted = await ItemService.deleteItem(req.params.id);
      if (!deleted) {
        return res.json(formatResponse(404, 'Товар не найден'));
      }
      return res.json(formatResponse(200, 'Товар успешно удалён'));
    } catch (err) {
      console.log(err);
      return res.json(formatResponse(500, 'Произошла ошибка при удалении товара'));
    }
  }
}

module.exports = ItemController;
