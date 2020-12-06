const Router = require("koa-router");
const problem = new Router()
const problemCtrl = require('./problem.ctrl')


problem.get('/',problemCtrl.get)

module.exports = problem