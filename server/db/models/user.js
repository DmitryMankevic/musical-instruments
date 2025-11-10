'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, { foreignKey: 'user_id', as: 'orders' });
      User.belongsToMany(models.Item, {
        through: models.Favourite,
        foreignKey: 'user_id',
        otherKey: 'item_id',
        as: 'items',
      });
      User.hasOne(models.Cart, { foreignKey: 'user_id', as: 'cart' });
      User.hasOne(models.UserInfo, { foreignKey: 'user_id', as: 'info' });
    }

    static validateSignup(user) {
      const { fullName, email, password } = user;
      if (!fullName || typeof fullName !== 'string' || fullName.trim() === '')
        return { isValid: false, error: 'fullName is required' };
      if (!email || typeof email !== 'string' || email.trim() === '')
        return { isValid: false, error: 'Email is required' };
      if (
        !password ||
        typeof password !== 'string' ||
        password.trim() === '' ||
        password.length < 6
      )
        return { isValid: false, error: 'Password is required' };
      return { isValid: true, error: null };
    }

    static validateLogin(user) {
      const { email, password } = user;
      if (!email || typeof email !== 'string' || email.trim() === '')
        return { isValid: false, error: 'Email is required' };
      if (!password || typeof password !== 'string' || password.trim() === '')
        return { isValid: false, error: 'Password is required' };
      return { isValid: true, error: null };
    }
  }

  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
