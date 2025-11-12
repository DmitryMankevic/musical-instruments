const express = require("express");
const router = express.Router();
const AdminUserController = require("../controllers/AdminUserController");
const { verifyAccessToken } = require("../middlewares/verifyTokens");

//  Получить всех пользователей (только для админа)
router.get("/", verifyAccessToken, AdminUserController.getAllUsers);

//  Удалить пользователя по ID
router.delete("/:id", verifyAccessToken, AdminUserController.deleteUser);

module.exports = router;
