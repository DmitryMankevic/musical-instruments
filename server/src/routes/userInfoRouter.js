const express = require('express');
const router = express.Router();
const UserInfoController = require('../controllers/UserInfoController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

router.get('/', verifyAccessToken, UserInfoController.getByUser);

router.post('/add', verifyAccessToken, UserInfoController.createUserInfo);

router.put('/update', verifyAccessToken, UserInfoController.updateUserInfo);

router.delete('/delete', verifyAccessToken, UserInfoController.deleteUserInfo);

module.exports = router;
