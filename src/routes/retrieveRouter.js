const apiRouter = require('./apiRouter');
const {Router} = require('express');
const retrieveRouter = Router();
apiRouter.use('/retrieve',retrieveRouter);
module.exports = {retrieveRouter};