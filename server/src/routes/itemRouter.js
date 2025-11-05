const express = require('express');
const itemRouter = express.Router();
const ItemController = require('../controllers/ItemController');

// GET /api/items — получить все товары
itemRouter.get('/', ItemController.getAll);

// GET /api/items/:id — получить товар по ID
itemRouter.get('/:id', ItemController.getById);

// POST /api/items — создать новый товар
itemRouter.post('/', ItemController.create);

// PUT /api/items/:id — обновить товар
itemRouter.put('/:id', ItemController.update);

// DELETE /api/items/:id — удалить товар
itemRouter.delete('/:id', ItemController.delete);

module.exports = itemRouter;
