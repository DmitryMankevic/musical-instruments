const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const serverConfig = require('./configs/serverConfig');
const apiRouter = require('./routes/apiRouter');
require('dotenv').config();

const app = express();

serverConfig(app);

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
