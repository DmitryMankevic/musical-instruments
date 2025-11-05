'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });

      Cart.belongsToMany(models.Item, {
        foreignKey: 'cart_id',
        otherKey: 'item_id',
        through: models.CartItem,
        as: 'items',
      });
      Cart.hasMany(models.CartItem, { foreignKey: 'cart_id', as: 'cartItems' });
    }
  }
  Cart.init(
    {
      user_id: DataTypes.INTEGER,
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      modelName: 'Cart',
    },
  );
  return Cart;
};
