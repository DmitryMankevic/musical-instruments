const express = require('express');
const router = express.Router();
const FavouriteController = require('../controllers/FavouriteController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

// GET /api/favourites/:userId — получить все избранные товары пользователя
router.get('/', verifyAccessToken, FavouriteController.getAllFavouritesItemsByUser);

// POST /api/favourites/add/:itemId — добавить товар в избранное
router.post('/:itemId', verifyAccessToken, FavouriteController.addItemInFavourites);

// DELETE /api/favourites/delete/:itemId — удалить из избранного
router.delete(
  '/:itemId',
  verifyAccessToken,
  FavouriteController.deleteItemFromFavourites,
);

module.exports = router;
