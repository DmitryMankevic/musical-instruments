'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Favourites', [
      {
        user_id: 2,
        item_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        item_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Favourites', {
      user_id: [2],
    });
  },
};
