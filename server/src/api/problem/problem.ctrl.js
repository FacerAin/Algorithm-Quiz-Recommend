const DB = require('../../config/db')


/*
GET api/problem
*/
exports.get = async (ctx) => {
    res = await DB('GET', "SELECT * FROM PROBLEM")
    ctx.body = res
}


/*
GET api/problem:id
*/
exports.getId = async (ctx) => {
    const {id} = ctx.params
    const query = `SELECT * FROM PROBLEM WHERE p_id = ${id}`
    res = await DB('GET', query)
    ctx.body = res
}
