const multer = require('multer');
const path = require('path');

// Конфигурация Multer для обработки загрузки файлов
const upload = multer({
  storage: multer.memoryStorage(), // Храним файлы в памяти для последующей обработки Sharp
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/; // Допустимые форматы файлов
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true); // Разрешаем загрузку, если формат верный
    }
    cb('Ошибка: разрешены только jpeg, jpg, png, webp изображения '); // Ошибка при неверном формате
  },
});

module.exports = upload;