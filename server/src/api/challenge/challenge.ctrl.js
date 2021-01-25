/*
GET api/challenge
*/



/*
GET api/challenge:id
*/
exports.get = async(ctx) => {
    //1.u_id와 연결된 c_id 추출
    //2. c_id와 연결된 p_id들 추출
    //3. 여기서 p_id는 다른 정보도 포함하도록
    //For Testing
    ctx.body = [{
        "p_id": 2626,
        "p_bj_id": 6603,
        "p_name": "로또"
    },
    {
        "p_id": 1115,
        "p_bj_id": 2504,
        "p_name": "괄호의 값"
    },
    {
        "p_id": 544,
        "p_bj_id": 1697,
        "p_name": "숨바꼭질"
    },
    {
        "p_id": 889,
        "p_bj_id": 2178,
        "p_name": "미로 탐색"
    },
    {
        "p_id": 2759,
        "p_bj_id": 7576,
        "p_name": "토마토"
    },

]
}
/*
POST api/challenge/
{
    u_id
    weak
    u_level
    c_level
}
*/

exports.set = async(ctx) => {
    const {u_id, weak, u_level, c_level, c_num, end_date} = ctx.request.body
    //1. 우선 정보를 Reco에 등록
    let query = `INSERT INTO CHALLENGE (c_level, c_num, c_end_date) VALUES ('${c_level}','${c_num}','${end_date}')` 
    res = await DB('UPDATE', query)
    //2. Reco_Pro에 문제 등록
    //3. Reco와 유저 연결
    query = `SELECT COUNT(*) FROM CHALLENGE`
    res = await DB('GET', query)
    c_idx = res.row[0][0] - 1

    convert_level = u_level
    if(c_level == 1){
        convert_level = u_level - 1
        if(u_level == 0){
            convert_level = 1
        } 
    }
    if(c_level == 3){
        convert_level = u_level + 1
        if(u_level == 5){
            convert_level = 5
        }
    }

    problem_list = []
    
    let weak_num = parseInt(c_num / 2);
    query = `SELECT * FROM PROBLEM as p JOIN CATEGORY as c ON p.p_id = c.p_id WHERE (p.p_id NOT IN (SELECT s.p_id FROM SOLVE as s WHERE s.u_id = '${u_id}')) AND (p.p_level BETWEEN ${(convert_level-1)*6} and ${(convert_level)*6}) AND (c.category IN ('${weak}')) ORDER BY submit_num DESC;`
    res = await DB('GET', query)
    for(let i = 0; i < res.row.length; i++){
        weak_num--
        problem_list.push([res.row[i]['p_id'],res.row[i]['p_name'],res.row[i]['p_bj_id'],res.row[i]['p_link']])
        if(weak_num == 0){
            break
        }
    }

    let normal_num = c_num - problem_list.length

    query = `SELECT * FROM algodb.PROBLEM as p JOIN algodb.CATEGORY as c ON p.p_id = c.p_id WHERE (p.p_id NOT IN (SELECT s.p_id FROM algodb.SOLVE as s WHERE s.u_id = '${u_id}')) AND (p.p_level BETWEEN ${(convert_level-1)*6} and ${(convert_level)*6}) ORDER BY submit_num DESC;`
    res = await DB('GET', query)

    for(let i = 0; i < res.row.length; i++){
        normal_num--
        problem_list.push([res.row[i]['p_id'],res.row[i]['p_name'],res.row[i]['p_bj_id'],res.row[i]['p_link']])
        if(normal_num == 0){
            break
        }
    }

    console.log(problem_list)

    query = `INSERT INTO RECOMMEND (u_id, c_id) VALUES ('${u_id}', ${c_idx})`
    res = await DB('UPDATE', query)

    for(let i = 0; i < problem_list.length; i++){
        query2 = `INSERT INTO challenge_problem (c_id, p_id) VALUES (${c_idx}, ${problem_list[i][0]})`
        re2 = await DB('UPDATE', query2)
    }

    ctx.body = problem_list
    
    //SOLVE 문제 빼고 검색
    //절반은 취약 유형
    //나머지는 랜덤하게
    //뽑는 순서는? 많이 푼 순서 우선!
}