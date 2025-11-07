/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Заказы пользователей
 */

/**
 * @swagger
 * /api/orders/admin/all:
 *   get:
 *     summary: Получить все заказы (только для администратора)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешно
 *       403:
 *         description: Доступ запрещён
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Получить заказы текущего пользователя
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешно
 *       204:
 *         description: Нет заказов
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Получить заказ по ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Найден
 *       404:
 *         description: Не найден
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Создать заказ
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - total
 *               - status
 *               - user_id
 *             properties:
 *               total:
 *                 type: number
 *                 example: 24.90
 *               status:
 *                 type: string
 *                 example: "new"
 *               desk:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *               user_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Создан
 *       500:
 *         description: Ошибка
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Обновить заказ
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: number
 *                 example: 24.90
 *               status:
 *                 type: string
 *                 example: "new"
 *               desk:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *               user_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Обновлён
 *       403:
 *         description: Нет доступа
 *       404:
 *         description: Не найден
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Удалить заказ
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Удалён
 *       403:
 *         description: Нет доступа
 *       404:
 *         description: Не найден
 */
