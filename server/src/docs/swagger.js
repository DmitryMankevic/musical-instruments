const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Musical Instruments API',
      version: '1.0.0',
      description: 'Документация для API заказов музыкальных инструментов',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/docs/*.js', './src/routes/*.js'], // путь к файлам с аннотациями
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
