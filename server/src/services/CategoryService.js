const { Category, Item } = require('../../db/models');

class CategoryService {
  static async getAll() {
    return await Category.findAll({ order: [['id', 'DESC']] });
  }

  static async getOneCategoryById(id) {
    const category = await Category.findByPk(id,{
      include: [{ model: Item, as: 'items' }],
    });
    return category;
  }

  static async addCategory(data) {
    const category = await Category.create(data);
    return category;
  }

  static async updateCategory({ id, name, photo }) {
    const newCategory = await this.getOneCategoryById(id);
    if (!newCategory) return null;
    const updated = await newCategory.update({ name, photo });
    return updated;
  }

  static async deleteOneCategory(id) {
    const category = await Category.destroy({ where: { id } });
    return category;
  }
}

module.exports = CategoryService;
