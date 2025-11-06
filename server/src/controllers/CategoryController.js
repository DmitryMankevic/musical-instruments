const CategoryService = require('../services/CategoryService');
const { Category } = require('../../db/models');
const formatResponse = require('../utils/formatResponse');

class CategoryController {
  static async getAllCategories(req, res) {
    try {
      const categoriesArr = await CategoryService.getAll();
      if (categoriesArr.length === 0) {
        return res
          .status(400)
          .json(formatResponse(400, 'Категорий товаров не обнаружено', []));
      }
      return res.status(200).json(formatResponse(200, 'Успешно', categoriesArr));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Ошибка сервера'));
    }
  }

  static async getOneCategoryById(req, res) {
    const { id } = req.params;
    try {
      const oneCategory = await CategoryService.getOneCategoryById(id);
      if (!oneCategory)
        return res
          .status(400)
          .json(formatResponse(400, 'Такой категории товаров не обнаружено'));
      return res.status(200).json(formatResponse(200, 'Успешно', oneCategory));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Ошибка сервера'));
    }
  }

  static async createNewCategory(req, res) {
     const {isAdmin} = res.locals.user
     if (!isAdmin) {
      return res.status(403).json(formatResponse(403, 'Доступ запрещён'));
    }
    if (!req.body)
      return res.status(400).json(formatResponse(400, 'Недостаточно данных'));
    const { name, photo } = req.body;
    try {
      const newCategory = await CategoryService.addCategory({
        name,
        photo,
      });
      return res.status(201).json(formatResponse(201, 'Успешно', newCategory));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Ошибка сервера'));
    }
  }

  static async updateCategory(req, res) {
     const {isAdmin} = res.locals.user
     if (!isAdmin) {
      return res.status(403).json(formatResponse(403, 'Доступ запрещён'));
    }
    if (!req.body)
      return res.son(formatResponse(400, 'Недостаточно данных для обновления'));
    const { name, photo } = req.body;
    const { id } = req.params;
    try {
      const updatedCategory = await CategoryService.updateCategory({ id, name, photo });
      if (!updatedCategory)
        return res
          .status(400)
          .json(formatResponse(400, 'Такой категории товаров не обнаружено'));
      return res.status(200).json(formatResponse(200, 'Успешно', updatedCategory));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Ошибка сервера'));
    }
  }

  static async deleteCategory(req, res) {     
     const { id } = req.params; 
    const {isAdmin} = res.locals.user
     if (!isAdmin) {
      return res.status(403).json(formatResponse(403, 'Доступ запрещён'));
    }
    try {
   
      const deletedCategory = await CategoryService.deleteOneCategory(id);
      if (!deletedCategory)
        return res
          .status(400)
          .json(formatResponse(400, 'Такой категории товаров не обнаружено'));
      return res.status(204).json(formatResponse(204, 'Успешно', deletedCategory));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Ошибка сервера'));
    }
  }


}

module.exports = CategoryController;
