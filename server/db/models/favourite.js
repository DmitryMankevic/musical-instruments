'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    static associate({User, Item}) {
     this.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
     this.belongsTo(Item, { foreignKey: "item_id", as: "item" });
    }
  }
  Favourite.init({
    user_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};