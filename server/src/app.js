const express = require('express');
const serverConfig = require('./configs/serverConfig');
const apiRouter = require('./routes/apiRouter');
require('dotenv').config();

const app = express();

serverConfig(app);

app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).send('Not found');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
