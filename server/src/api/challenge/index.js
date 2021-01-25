const Router = require("koa-router");
const challenge = new Router()
const challengeCtrl = require('./challenge.ctrl')


challenge.get('/',challengeCtrl.get)

module.exports = challenge