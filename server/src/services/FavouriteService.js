const { Favourite, Item } = require('../../db/models');

class FavouriteService {
  static async getAllByUserId(user_id) {
    const favouritesItems = await Favourite.findAll({
      where: { user_id },
      include: [{ model: Item, as: 'item' }],
    });
    return favouritesItems.map(elem => elem.item);   // elem.item (по алиасу)
  }

  static async addItem(user_id, item_id) {
    const itemExists = await Item.findByPk(item_id);
    if (!itemExists) throw new Error('Товар не найден'); // проверка на наличие товара как такового
    const existing = await Favourite.findOne({ where: { user_id, item_id } });
    if (existing) {
      return existing;
    } // проверка на наличие товара в избранном
    const favourite = await Favourite.create({ user_id, item_id });
    return favourite;
  }

  static async deleteItem(user_id, item_id) {
    const result = await Favourite.destroy({
      where: { user_id, item_id },
    });
    return result > 0; // true, если удалено хотя бы 1
  }
}

module.exports = FavouriteService;
