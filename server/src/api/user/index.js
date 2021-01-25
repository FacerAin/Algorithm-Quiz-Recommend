const Router = require("koa-router");
const user = new Router()
const userCtrl = require('./user.ctrl')

user.get('/', userCtrl.get)
user.get('/:id', userCtrl.getId)
user.post('/',userCtrl.set)
user.post('/syncBJ',userCtrl.syncBJ)
user.post('/level',userCtrl.level)
user.post('/weak', userCtrl.weak)

module.exports = user