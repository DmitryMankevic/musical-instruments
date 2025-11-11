const FavouriteService = require('../services/FavouriteService');
const formatResponse = require('../utils/formatResponse');

class FavouriteController {
  static async getAllFavouritesItemsByUser(req, res) {
    try {
      const userId = res.locals.user.id;
      const parsedUserId = Number(userId);
      if (isNaN(parsedUserId) || parsedUserId <= 0) {
        return res.status(400).json(formatResponse(400, 'Некорректные ID пользователя'));
      }
      const favouritesItemsArr = await FavouriteService.getAllByUserId(parsedUserId);
      if (favouritesItemsArr.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, 'Товаров в избранном не обнаружено', []));
      }
      return res.status(200).json(formatResponse(200, 'Успешно', favouritesItemsArr));
    } catch (error) {
      console.error('Ошибка при получении избранного:', error);
      return res.status(500).json(formatResponse(500, 'Ошибка сервера'));
    }
  }

  static async addItemInFavourites(req, res) {
    const userId = res.locals.user.id;
    const { itemId } = req.params;
    const parsedUserId = Number(userId); // Валидация ID пользователя и ID товара
    const parsedItemId = Number(itemId);
    if (
      isNaN(parsedUserId) ||
      isNaN(parsedItemId) ||
      parsedUserId <= 0 ||
      parsedItemId <= 0
    ) {
      return res
        .status(400)
        .json(formatResponse(400, 'Некорректные ID пользователя или товара'));
    }
    try {
      const favourite = await FavouriteService.addItem(parsedUserId, parsedItemId);
      if (!favourite) {
        return res
          .status(400)
          .json(formatResponse(400, 'Не удалось добавить в избранное'));
      }
      return res
        .status(201)
        .json(formatResponse(201, 'Товар добавлен в избранное', favourite));
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error);
      return res.status(500).json(formatResponse(500, 'Ошибка сервера'));
    }
  }

  static async deleteItemFromFavourites(req, res) {
    const userId = res.locals.user.id;
    const { itemId } = req.params;
    const parsedUserId = Number(userId);
    const parsedItemId = Number(itemId);
    if (
      isNaN(parsedUserId) ||
      isNaN(parsedItemId) ||
      parsedUserId <= 0 ||
      parsedItemId <= 0
    ) {
      return res
        .status(400)
        .json(formatResponse(400, 'Некорректные ID пользователя или товара'));
    }
    try {
      const deleted = await FavouriteService.deleteItem(parsedUserId, parsedItemId);
      if (!deleted) {
        return res.status(404).json(formatResponse(404, 'Запись в избранном не найдена'));
      }
      return res.status(200).json(formatResponse(200, 'Товар удалён из избранного'));
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
      return res.status(500).json(formatResponse(500, 'Ошибка сервера'));
    }
  }
}

module.exports = FavouriteController;
