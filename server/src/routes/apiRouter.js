const express = require('express');
const authRouter = require('./authRouter');

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);

module.exports = apiRouter;
