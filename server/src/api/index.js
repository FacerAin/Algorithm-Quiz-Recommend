const Router = require("koa-router");
const api = new Router();

//const user = require('./user')
//const recommend = require('./recommend')
const problem = require('./problem')


//api.use('/user', user.routes())
//api.use('/recommend', recommend.routes())
api.use('/problem', problem.routes())

module.exports = api