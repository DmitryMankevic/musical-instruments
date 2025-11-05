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
  }
  Item.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      marker: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      article: DataTypes.STRING,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Item',
    },
  );
  return Item;
};
