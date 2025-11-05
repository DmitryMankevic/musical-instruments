'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Гитары',
        photo: 'https://example.com/images/guitar.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ударные',
        photo: 'https://example.com/images/drums.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Клавишные',
        photo: 'https://example.com/images/keyboard.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Струнные',
        photo: 'https://example.com/images/string.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Духовые',
        photo: 'https://example.com/images/wind.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Смычковые',
        photo: 'https://example.com/images/bowed.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Синтезаторы',
        photo: 'https://example.com/images/synth.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Аудиооборудование',
        photo: 'https://example.com/images/audio.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Аксессуары',
        photo: 'https://example.com/images/accessories.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'DJ-оборудование',
        photo: 'https://example.com/images/dj.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
