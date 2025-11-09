'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      {
        total: 2499.99,
        status: 'В обработке',
        decs: 'Первый заказ: две гитары',
        user_id: 2,            
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total: 5999.50,
        status: 'подтвержден',
        decs: 'Заказ: ударная установка',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total: 129.00,
        status: 'доставлен',
        decs: 'Аксессуар: ремень для гитары',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total: 3499.95,
        status: 'отправлен',
        decs: 'Клавишный синтезатор 61 клавиша',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total: 1499.00,
        status: 'отменён',
        decs: 'Заказ отменён: духовой инструмент',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', {
      status: ['pending','confirmed','delivered','shipped','cancelled'],
      user_id: 2
    });
  },
};
