const express = require('express');
const router = express.Router();
const FavouriteController = require('../controllers/FavouriteController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

// GET /api/favourites/:userId — получить все избранные товары пользователя
router.get(
  '/:userId',
  verifyAccessToken,
  FavouriteController.getAllFavouritesItemsByUser,
);
// POST /api/favourites/:userId/add/:itemId — добавить товар в избранное
router.post(
  '/:userId/add/:itemId',
  verifyAccessToken,
  FavouriteController.addItemInFavourites,
);
// DELETE /api/favourites/:userId/remove/:itemId — удалить из избранного
router.delete(
  '/:userId/delete/:itemId',
  verifyAccessToken,
  FavouriteController.deleteItemFromFavourites,
);

module.exports = router;
