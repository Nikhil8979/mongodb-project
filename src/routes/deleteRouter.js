const apiRouter = require('./apiRouter');
const {Router} = require('express');
const deleteRouter = Router();
apiRouter.use('/delete',deleteRouter);
module.exports = {deleteRouter};