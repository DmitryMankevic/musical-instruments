'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Items', [
      {
        title: 'Инструмент 1',
        desc: 'Описание для Инструмент 1',
        price: 5380.34,
        marker: 'Hot deals',
        category_id: 10,
        article: 'ART0001',
        img: 'https://example.com/images/item_1.jpg',
        stock: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Инструмент 2',
        desc: 'Описание для Инструмент 2',
        price: 6038.57,
        marker: 'New',
        category_id: 4,
        article: 'ART0002',
        img: 'https://example.com/images/item_2.jpg',
        stock: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Инструмент 3',
        desc: 'Описание для Инструмент 3',
        price: 11752.14,
        marker: 'New',
        category_id: 4,
        article: 'ART0003',
        img: 'https://example.com/images/item_3.jpg',
        stock: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Инструмент 4',
        desc: 'Описание для Инструмент 4',
        price: 14416.4,
        marker: 'Top-Seller',
        category_id: 6,
        article: 'ART0004',
        img: 'https://example.com/images/item_4.jpg',
        stock: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Инструмент 5',
        desc: 'Описание для Инструмент 5',
        price: 4615.25,
        marker: 'Hot deals',
        category_id: 2,
        article: 'ART0005',
        img: 'https://example.com/images/item_5.jpg',
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Инструмент 6',
        desc: 'Описание для Инструмент 6',
        price: 9287.83,
        marker: 'New',
        category_id: 5,
        article: 'ART0006',
        img: 'https://example.com/images/item_6.jpg',
        stock: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Инструмент 7',
        desc: 'Описание для Инструмент 7',
        price: 13637.91,
        marker: 'Top-Seller',
        category_id: 7,
        article: 'ART0007',
        img: 'https://example.com/images/item_7.jpg',
        stock: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Инструмент 8',
        desc: 'Описание для Инструмент 8',
        price: 12752.33,
        marker: 'Hot deals',
        category_id: 10,
        article: 'ART0008',
        img: 'https://example.com/images/item_8.jpg',
        stock: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Инструмент 9',
        desc: 'Описание для Инструмент 9',
        price: 10169.41,
        marker: 'New',
        category_id: 10,
        article: 'ART0009',
        img: 'https://example.com/images/item_9.jpg',
        stock: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Инструмент 10',
        desc: 'Описание для Инструмент 10',
        price: 9647.57,
        marker: 'Top-Seller',
        category_id: 4,
        article: 'ART0010',
        img: 'https://example.com/images/item_10.jpg',
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 👇 Добавляем ещё 30 сидов
      ...Array.from({ length: 30 }).map((_, i) => {
        const index = i + 11;
        const markers = ['New', 'Hot deals', 'Top-Seller'];
        return {
          title: `Инструмент ${index}`,
          desc: `Описание для Инструмент ${index}`,
          price: (Math.random() * 15000 + 1000).toFixed(2),
          marker: markers[index % 3],
          category_id: (index % 10) + 1,
          article: `ART00${index}`,
          img: `https://example.com/images/item_${index}.jpg`,
          stock: index,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),

      // 👇 Ещё 10 для ровного 50
      ...Array.from({ length: 10 }).map((_, i) => {
        const index = i + 41;
        const markers = ['Hot deals', 'New', 'Top-Seller'];
        return {
          title: `Инструмент ${index}`,
          desc: `Описание для Инструмент ${index}`,
          price: (Math.random() * 12000 + 2000).toFixed(2),
          marker: markers[index % 3],
          category_id: (index % 8) + 1,
          article: `ART00${index}`,
          img: `https://example.com/images/item_${index}.jpg`,
          stock: index,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  },
};
