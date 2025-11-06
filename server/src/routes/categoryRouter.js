const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getOneCategoryById);
router.post('/', verifyAccessToken, CategoryController.createNewCategory);
router.put('/:id',verifyAccessToken,  CategoryController.updateCategory);
router.delete('/:id', verifyAccessToken, CategoryController.deleteCategory);

module.exports = router;
