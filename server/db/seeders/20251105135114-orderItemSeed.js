'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('OrderItems', [
      {
        order_id: 1,
        item_id: 3,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 1,
        item_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 2,
        item_id: 7,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 2,
        item_id: 2,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 3,
        item_id: 9,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 3,
        item_id: 1,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 4,
        item_id: 4,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 4,
        item_id: 6,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 5,
        item_id: 8,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 5,
        item_id: 10,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderItems', {
      order_id: [1, 2, 3, 4, 5],
    });
  },
};
