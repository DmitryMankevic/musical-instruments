'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
      Item.hasMany(models.CartItem, { foreignKey: 'item_id', as: 'cartItems' });
      Item.belongsToMany(models.Cart, {
        through: models.CartItem,
        foreignKey: 'item_id',
        otherKey: 'cart_id',
        as: 'carts',
      });
    }

    static validate(data) {
      const { title, desc, price, marker, stock, article, img, category_id } = data;
      if (!title || typeof title !== 'string' || title.trim() === '')
        return { isValid: false, error: 'Title is required' };
      if (!desc || typeof desc !== 'string' || desc.trim() === '')
        return { isValid: false, error: 'Description is required' };
      if (typeof price !== 'number' || price <= 0)
        return { isValid: false, error: 'Price must be a positive number' };
      if (marker && typeof marker !== 'string')
        return { isValid: false, error: 'Marker must be string' };
        if (typeof stock !== 'number' || stock < 0)
        return { isValid: false, error: 'Stock must be a non-negative number' };
      if (!article || typeof article !== 'string' || article.trim() === '')
        return { isValid: false, error: 'Article is required' };
      if (!img || typeof img !== 'string')
        return { isValid: false, error: 'Image URL is required' };
      if (typeof category_id !== 'number' || category_id <= 0)
        return { isValid: false, error: 'Category ID must be a positive number' };
      return { isValid: true, error: null };
    }
  }
  Item.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      marker: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      article: DataTypes.STRING,
      img: DataTypes.STRING,
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Item',
    },
  );
  return Item;
};
