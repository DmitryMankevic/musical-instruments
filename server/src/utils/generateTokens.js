require('dotenv').config(); // используем переменные из .env
const jwt = require('jsonwebtoken'); // берем методы из модуля jsonwebtoken
const jwtConfig = require('../configs/jwtConfig'); // для настройки времени жизни токена

// payload = user
const generateTokens = (payload) => ({
  // токен доступа - короткий
  accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, jwtConfig.access),
  // токен обновления - долгий
  refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, jwtConfig.refresh),
});

module.exports = generateTokens;
