'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Гитары',
        photo: 'http://localhost:3000/api/uploads/images/1762710586507.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ударные',
        photo: 'http://localhost:3000/api/uploads/images/1762710569273.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Клавишные',
        photo: 'http://localhost:3000/api/uploads/images/1762710559331.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Струнные',
        photo: 'http://localhost:3000/api/uploads/images/1762712935081.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Духовые',
        photo: 'http://localhost:3000/api/uploads/images/1762710501742.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Смычковые',
        photo: 'http://localhost:3000/api/uploads/images/1762710511410.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Синтезаторы',
        photo: 'http://localhost:3000/api/uploads/images/1762712750999.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Аудиооборудование',
        photo: 'http://localhost:3000/api/uploads/images/1762710491978.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Аксессуары',
        photo: 'http://localhost:3000/api/uploads/images/1762710613724.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'DJ-оборудование',
        photo: 'http://localhost:3000/api/uploads/images/1762710460412.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
