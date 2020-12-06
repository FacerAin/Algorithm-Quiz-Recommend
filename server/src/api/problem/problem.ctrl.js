const getConnection = require('../../config/db');


/*
GET api/problem
*/
exports.get = async(ctx) => {
    getConnection((err, connection) => {
        console.log(err)
        connection.query('SELECT * FROM PROBLEM', (err, rows) => {
            
            if(!err){
                console.log(rows)
            }else{
                throw err
            }
            connection.release()
            console.log(rows)
        })
    })
}

