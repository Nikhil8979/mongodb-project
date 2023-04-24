const apiRouter = require('./apiRouter');
const {Router} = require('express');
const statusRouter = Router();
apiRouter.use('/status',statusRouter);
module.exports = {statusRouter};