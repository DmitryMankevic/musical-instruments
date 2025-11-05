'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
   
    static associate({Item}) {
      this.hasMany(Item, { foreignKey: "category_id", as: "items" });
    }
  }
  Category.init({
    name: DataTypes.STRING,
    photo: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};