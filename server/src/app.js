const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const serverConfig = require('./configs/serverConfig');
const apiRouter = require('./routes/apiRouter');
require('dotenv').config();
const sharp = require('sharp'); // Подключаем Sharp для обработки изображений
const upload = require('./middlewares/upload'); // Подключаем настроенный Multer
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

serverConfig(app);

// Папка для сохранения изображений
const uploadDir = path.join(__dirname, '../uploads');

app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    const fileName = `${Date.now()}.webp`;
    const filePath = path.join(uploadDir, 'images', fileName);
    // Конвертация и сохранение изображения в WebP с помощью Sharp
    await sharp(req.file.buffer)
      .webp({ quality: 80 }) // Указываем формат WebP и качество 80%
      .toFile(filePath);
    res.status(200).json({ fileName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при обработке изображения' });
  }
});

app.use('/api/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api', apiRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).send('Not found');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(
    `\u001b[32m🍺🍺🍺🍺🍺🍺🍺🍺 Порт \u001b[35m${PORT} \u001b[32mзавёлся 🍺🍺🍺🍺🍺🍺🍺🍺`,
  );
});

module.exports = app;
