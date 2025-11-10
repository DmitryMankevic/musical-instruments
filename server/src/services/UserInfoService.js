const { UserInfo } = require('../../db/models');

class UserInfoService {
  static async getUserInfoByUserId(userId) {
    return UserInfo.findOne({ where: { user_id: userId } });
  }

  static async createUserInfo(userInfoData) {
    return UserInfo.create(userInfoData);
  }

 static async updateUserInfo(userId, userInfoData) {
  await UserInfo.update(userInfoData, { where: { user_id: userId } });
  return UserInfo.findOne({ where: { user_id: userId } }); // ← возвращаем актуальный объект
}


  static async deleteUserInfo(userId) {
    return UserInfo.destroy({ where: { user_id: userId } });
  }
}

module.exports = UserInfoService;
