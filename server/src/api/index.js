const Router = require("koa-router");
const api = new Router();

const user = require('./user')
//const recommend = require('./recommend')
const problem = require('./problem')
const auth = require('./auth')
const challenge = require('./challenge')


api.use('/user', user.routes())
api.use('/challenge', challenge.routes())
//api.use('/recommend', recommend.routes())
api.use('/problem', problem.routes())
api.use('/auth', auth.routes())
module.exports = api