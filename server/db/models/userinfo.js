'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    static associate(models) {
      // Один к одному: User имеет UserInfo
      UserInfo.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  UserInfo.init(
    {
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthDay: {
        type: DataTypes.DATE, // Лучше дата, а не число
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Таблица Users
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'UserInfo',
      tableName: 'UserInfos',
    }
  );

  return UserInfo;
};
