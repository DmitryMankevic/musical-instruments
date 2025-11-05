'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('Andrew310196@icloud.com', 10);
    const passwordHash2 = await bcrypt.hash('test@mail.ru', 10);

    const users = [
      {
        fullName: 'Andrew',
        email: 'Andrew310196@icloud.com',
        isAdmin: true,
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: 'Dima',
        email: 'test@mail.ru',
        isAdmin: false,
        password: passwordHash2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: ['Andrew310196@icloud.com', 'test@mail.ru'],
    });
  },
};
