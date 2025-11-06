const { Item } = require('../../db/models');

class ItemService {
  static async getAllItems() {
    return Item.findAll();
  }

  static async createItem(data) {
    return Item.create(data);
  }

  static async getItemById(id) {
    return Item.findByPk(id);
  }

  static async updateItem(id, data) {
    const item  = await ItemService.getItemById(id);
    if (item) {
      await item.update(data);
    }
    return item
  }

  static async deleteItem(id) {
    const item = await ItemService.getItemById(id);
    if (item) {
      await item.destroy();
    }
    return item;
  }
}

module.exports = ItemService;
