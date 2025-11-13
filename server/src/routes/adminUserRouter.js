const express = require("express");
const router = express.Router();
const { User } = require("../../db/models");
const AdminUserController = require("../controllers/AdminUserController");
const { verifyAccessToken } = require("../middlewares/verifyTokens");

//  Получить всех пользователей (только для админа)
router.get("/", verifyAccessToken, AdminUserController.getAllUsers);

//  Удалить пользователя по ID
router.delete("/:id", verifyAccessToken, AdminUserController.deleteUser);

// PATCH /api/admin/users/:id/toggle-admin
router.patch('/:id/toggle-admin', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    user.isAdmin = !user.isAdmin;
    await user.save();

    res.json({ success: true, isAdmin: user.isAdmin });
  } catch (error) {
    console.error('Ошибка при изменении статуса администратора:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
