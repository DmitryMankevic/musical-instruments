const UserInfoService = require('../services/UserInfoService');
const formatResponse = require('../utils/formatResponse');

class UserInfoController {
  static async getByUser(req, res) {
    try {
      const userId = res.locals.user.id;
      const userInfo = await UserInfoService.getUserInfoByUserId(userId);
      if (!userInfo) {
        return res.status(404).json(formatResponse(404, 'User info not found'));
      }
      return res.json(formatResponse(200, 'Success', userInfo));
    } catch (err) {
      console.error('Error fetching user info:', err);
      res
        .status(500)
        .json(formatResponse(500, 'Internal Server Error', null, err.message));
    }
  }

  static async updateUserInfo(req, res) {
    try {
      const userId = res.locals.user.id;
      const userInfo = await UserInfoService.getUserInfoByUserId(userId);
      if (!userInfo) {
        return res.status(404).json(formatResponse(404, 'User info not found'));
      }
      const updatedInfo = await UserInfoService.updateUserInfo(userId, req.body);
      return res.json(formatResponse(200, 'User info updated successfully', updatedInfo));
    } catch (err) {
      console.error('Error updating user info:', err);
      res
        .status(500)
        .json(formatResponse(500, 'Internal Server Error', null, err.message));
    }
  }

  static async createUserInfo(req, res) {
    try {
      const userId = res.locals.user.id;
      const newUserInfo = await UserInfoService.createUserInfo({
        user_id: userId,
        ...req.body,
      });
      return res
        .status(201)
        .json(formatResponse(201, 'User info created successfully', newUserInfo));
    } catch (err) {
      console.error('Error creating user info:', err);
      res
        .status(500)
        .json(formatResponse(500, 'Internal Server Error', null, err.message));
    }
  }

  static async deleteUserInfo(req, res) {
    try {
      const userId = res.locals.user.id;
      await UserInfoService.deleteUserInfo(userId);
      return res.json(formatResponse(200, 'User info deleted successfully'));
    } catch (err) {
      console.error('Error deleting user info:', err);
      res
        .status(500)
        .json(formatResponse(500, 'Internal Server Error', null, err.message));
    }
  }
}

module.exports = UserInfoController;
