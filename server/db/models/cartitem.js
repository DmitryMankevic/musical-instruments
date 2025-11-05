'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.Item, { foreignKey: 'item_id', as: 'item' });
      CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id', as: 'cart' });
    }
  }
  CartItem.init(
    {
      item_id: DataTypes.INTEGER,
      cart_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'CartItem',
    },
  );
  return CartItem;
};
