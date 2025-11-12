const express = require('express');
const authRouter = require('./authRouter');
const orderRouter = require('./orderRouter');
const favouriteRouter = require('./favouriteRouter');
const categoryRouter = require('./categoryRouter');
const itemRouter = require('./itemRouter');
const cartRouter = require('./cartRouter');
const userInfoRouter = require('./userInfoRouter');
const apiChat = require('./apiChatRouter');
const adminUserRouter = require('./adminUserRouter');

const apiRouter = express.Router();

apiRouter.use('/chat', apiChat); // AI DeepSeek
apiRouter.use('/auth', authRouter);
apiRouter.use('/orders', orderRouter);
apiRouter.use('/user-info', userInfoRouter);
apiRouter.use('/favourites', favouriteRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/items', itemRouter);
apiRouter.use('/admin/users', adminUserRouter);
apiRouter.use('/cart', cartRouter);

module.exports = apiRouter;
