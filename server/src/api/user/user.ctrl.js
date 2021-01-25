const DB = require('../../config/db')
const {getProblem} = require('../../util/getProblem')
const {getBJ} = require('../../util/getBJ')
/*
GET api/user
*/
exports.get = async (ctx) => {
    res = await DB ('GET', "SELECT * FROM USER")
}

/*
GET api/user:id
*/
exports.getId = async (ctx) => {
    const {id} = ctx.params
    const query = `SELECT * FROM USER WHERE u_id = '${id}'`
    res = await DB('GET', query)
    ctx.body = res
}
/*
POST api/user
u_id: String (Required)
u_name: String
u_bj_id: String
u_cf_id: String
u_email: String
default is ''
*/

exports.set = async(ctx) => {
    const {u_id, u_name, u_bj_id, u_cf_id, u_email} = ctx.request.body
    let query = `UPDATE USER SET u_name='${u_name}', u_bj_id='${u_bj_id}', u_cf_id='${u_cf_id}', u_email='${u_email}' WHERE u_id = '${u_id}'`
    res = await DB('UPDATE', query)
    ctx.body = res
}

/*
POST api/user/level
{
u_id
}
*/

exports.level = async(ctx) => {
    const {u_id} = ctx.request.body
    let query = `SELECT * FROM SOLVE WHERE u_id = '${u_id}'`
    res = await DB('GET', query)

    level_sum = 0

    for (let i = 0; i < res.row.length; i++){
        query2 = `SELECT * FROM PROBLEM WHERE p_id = '${res.row[i].p_id}'`
        res2 = await DB('GET', query2)
        p_level = res2.row[0].p_level
        if(p_level > 0 && p_level < 7){
            level_sum += 1

        }else if(p_level > 6 && p_level < 13){
            level_sum += 3

        }else if(p_level >12 && p_level < 19){
            level_sum += 6

        }else if(p_level > 18 && p_level < 25){
            level_sum += 16

        }else if(p_level > 24){
            level_sum += 25

        }
    }
    let u_level = 0
    if(level_sum < 200){
        u_level = 1
    }else if(level_sum < 500){
        u_level = 2
    }else if(level_sum < 1000){
        u_level = 3
    }else if(level_sum < 3000){
        u_level = 4
    }else if(level_sum >= 3000){
        u_level = 5
    }

    query = `UPDATE USER SET u_level = ${u_level} WHERE u_id = '${u_id}'`
    res = await DB('UPDATE', query)
    ctx.body = res

}

/*
POST api/user/weak
{

u_id
    u_level을 안다
    solve에서 분류별로 문제를 얼마나 풀었는지 안다.
    각 유형별 실력 점수가 필요하다.
    산출할 실력 
    implementation, string, sorting
    math, arithmetic
    bruteforcing
    dp
    graphs, graph_traversal
    greedy
    queue, stack, deque, data_structures
    trees
    backtracking
    recursion
    SOLVE JOIN CATEGORY



}
*/
exports.weak = async (ctx) => {
    let category_score = {
        implementation: 0,
        math: 0,
        brute: 0,
        dp: 0,
        graph: 0,
        trees: 0,
        ds: 0,
        greedy: 0,
        backtracking: 0,
        recursion: 0
    }

    const {u_id} = ctx.request.body
    query = `SELECT * FROM category as c JOIN solve as s ON c.p_id = s.p_id and s.u_id = '${u_id}';`
    res = await DB('GET', query)
    for (let i = 0; i < res.row.length; i++){
        query2 = `SELECT p_name, p_level FROM algodb.problem as p WHERE p.p_id = ${res.row[i].p_id};`
        res2 = await DB('GET', query2)
        p_level = res2.row[0].p_level
        level_convert = 0
        if(p_level > 0 && p_level < 7){
            level_convert += 1

        }else if(p_level > 6 && p_level < 13){
            level_convert += 3

        }else if(p_level >12 && p_level < 19){
            level_convert += 6

        }else if(p_level > 18 && p_level < 25){
            level_convert += 16

        }else if(p_level > 24){
            level_convert += 25
        }
        if(res.row[i].category == "implementation" || res.row[i].category == "string" || res.row[i].category == "sorting"){
            category_score["implementation"] += level_convert
           }
        if(res.row[i].category == 'math' || res.row[i].category == 'arithmetic'){
            category_score["math"] += level_convert
        }
        if(res.row[i].category == 'bruteforcing'){
            category_score["brute"] += level_convert
        }
        if(res.row[i].category == 'dp'){
            category_score["dp"] += level_convert
        }
        if(res.row[i].category == 'graphs', res.row[i].category == 'graph_traversal'){
            category_score["graph"] += level_convert
        }
        if(res.row[i].category == 'greedy'){
            category_score["greedy"] += level_convert
        }
        if(res.row[i].category == 'queue' || res.row[i].category == 'stack' || res.row[i].category == 'deque' || res.row[i].category == 'data_structures')
        {
            category_score["ds"] += level_convert
        }
        if(res.row[i].category == 'trees'){
            category_score["trees"] += level_convert
        }
        if(res.row[i].category == "backtracking"){
            category_score["backtracking"] += level_convert
        }
        if(res.row[i].category == 'recursion'){
            category_score["recursion"] += level_convert
        }


    }
    let sortObj = []
    for (let number in category_score){
        sortObj.push([number, category_score[number]])
    }
    sortObj.sort(function(a,b) {
        return a[1] - b[1]
    })
    let randNum = Math.floor(Math.random()*4)
    ctx.body = sortObj[randNum]
}
/*
POST api/user/syncBJ/
{
u_id

}
*/
exports.syncBJ = async (ctx) => {

    const {u_id} = ctx.request.body
    console.log(u_id)
    let query = `SELECT u_bj_id FROM USER WHERE u_id = '${u_id}'`
    res = await DB('GET', query)
    u_bj_id = res.row[0].u_bj_id 
    if(!u_bj_id){
        ctx.status = 401
        return
    }

    problemList =  await getBJ(u_bj_id)
    pidList = []


    //problem 릴레이션에 등록된 문제인지 체크
    for (let i = 0; i < problemList.length; i++){
        query = `SELECT p_id FROM PROBLEM WHERE p_bj_id = '${problemList[i]['problem_number']}'`
        res = await DB('GET', query)
        p_id = res.row[0].p_id
        if(!p_id){
            //문제 추가 처리할 것
            //일단은 DB에 없는 문제면 생략함
            continue
        } 
        pidList.push({p_id: p_id,
            solve_date: problemList[i]['solve_date']
        })
    }

    for (let i = 0; i < pidList.length; i++){
        query = `INSERT INTO SOLVE (u_id, p_id, solve_date) VALUES ('${u_id}','${pidList[i]['p_id']}', '${pidList[i]['solve_date']}') ON DUPLICATE KEY UPDATE SOLVE_DATE='${pidList[i]['solve_date']}'`
        res = await DB('INSERT', query)
    }

    ctx.body = res

    //psArr = await getBJ(user_id)
    //console.log(psArr)
    //let query = `SELECT p_id FROM USER WHERE u_id = ${id}`
    //
}
