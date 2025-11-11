const { Item } = require('../../db/models');

class ItemService {
  static async getAllItems(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const { rows: items, count: total } = await Item.findAndCountAll({
      limit,
      offset,
      order: [['id', 'ASC']],
    });

    return { items, total };
  }

  static async createItem(data) {
    return Item.create(data);
  }

  static async getItemById(id) {
    return Item.findByPk(id);
  }

  static async updateItem(id, data) {
    const item = await this.getItemById(id);
    if (item) await item.update(data);
    return item;
  }

  static async deleteItem(id) {
    const item = await this.getItemById(id);
    if (item) await item.destroy();
    return item;
  }
}

module.exports = ItemService;
