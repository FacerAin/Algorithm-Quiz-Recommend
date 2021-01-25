const Router = require("koa-router");
const problem = new Router()
const problemCtrl = require('./problem.ctrl')


problem.get('/',problemCtrl.get)
problem.get('/:id',problemCtrl.getId)

module.exports = problem