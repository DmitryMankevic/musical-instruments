'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.User, { foreignKey: 'user_id', as: 'user' });
      Order.belongsToMany(models.Item, {
        through: models.OrderItem,
        foreignKey: 'order_id',
        otherKey: 'item_id',
        as: 'items',
      });
    }
  }
  Order.init(
    {
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      decs: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
