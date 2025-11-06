const express = require('express');
const ItemController = require('../controllers/ItemController');
const itemRouter = express.Router();

// GET /api/items — получить все товары
itemRouter.get('/', ItemController.getAllItems);

// GET /api/items/:id — получить товар по ID
itemRouter.get('/:id', ItemController.getItemById);

// POST /api/items — создать новый товар
itemRouter.post('/', ItemController.createItem);

// PUT /api/items/:id — обновить товар
itemRouter.put('/:id', ItemController.updateItem);

// DELETE /api/items/:id — удалить товар
itemRouter.delete('/:id', ItemController.deleteItem);

module.exports = itemRouter;
