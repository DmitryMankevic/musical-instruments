const express = require('express');
const authRouter = require('./authRouter');
const orderRouter = require('./orderRouter');
const favouriteRouter = require('./favouriteRouter');
const categoryRouter = require('./categoryRouter');
const itemRouter = require('./itemRouter');
const cartRouter = require('./cartRouter');

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/orders', orderRouter);
apiRouter.use('/favourites', favouriteRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/items', itemRouter);
apiRouter.use('/cart', cartRouter);

module.exports = apiRouter;
