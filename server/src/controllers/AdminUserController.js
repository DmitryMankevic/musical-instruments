const { User } = require('../../db/models');
const formatResponse = require('../utils/formatResponse');

class AdminUsersController {
  static async getAllUsers(req, res) {
    try {
      const { isAdmin } = res.locals.user;
      if (!isAdmin) {
        return res.status(403).json(formatResponse(403, 'Forbidden'));
      }

      const users = await User.findAll({
        attributes: ['id', 'fullName', 'email', 'isAdmin', 'createdAt'],
        order: [['id', 'ASC']],
      });

      res.json(formatResponse(200, 'Success', users));
    } catch (err) {
      console.error('Error fetching all users:', err);
      res.status(500).json(formatResponse(500, 'Internal Server Error', null, err.message));
    }
  }

  static async deleteUser(req, res) {
    try {
      const { isAdmin } = res.locals.user;
      if (!isAdmin) {
        return res.status(403).json(formatResponse(403, 'Forbidden'));
      }

      const { id } = req.params;
      await User.destroy({ where: { id } });
      res.json(formatResponse(200, 'User deleted successfully'));
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json(formatResponse(500, 'Internal Server Error', null, err.message));
    }
  }
}

module.exports = AdminUsersController;
