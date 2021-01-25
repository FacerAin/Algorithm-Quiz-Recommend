const Joi = require("joi");
const DB = require('../../config/db')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

/*
POST api/auth/register
{
    u_id
    u_name
    u_password
}
*/
exports.register = async (ctx) => {
    const schema = Joi.object().keys({
        u_id: Joi.string().alphanum().min(3).max(45).required(),
        u_password: Joi.string().max(45).required()
    }).unknown()

    const check = schema.validate(ctx.request.body)
    if (check.error) {
        ctx.status = 400
        ctx.body = check.error;
        return
    }

    const { u_id, u_name, u_password } = ctx.request.body
    try {
        let query = `SELECT * FROM USER WHERE u_id = "${u_id}"`
        res = await DB('GET', query)
        if (res.row[0]) {
            console.log('con')
            ctx.status = 409
            return
        }

        const hash_password = await bcrypt.hash(u_password, 10)

        query = `INSERT INTO user (u_id, u_name, u_password) VALUES ('${u_id}', '${u_name}', "${hash_password}");`
        await DB('INSERT', query)

        query = `SELECT * FROM user WHERE u_id = '${u_id}'`
        res = await DB('INSERT', query)
        ctx.body = res

        const token = jwt.sign(
            {
                id: u_id,
            },
            process.env.JWT_SECRET, {
            expiresIn: "3d",
        }
        )

        ctx.cookies.set("access_token", token, {
            //3일동안 유효
            maxAge: 1000 * 60 * 60 * 24 * 3,
            httpOnly: true,
        })


    }
    catch (err) {
        ctx.throw(500, err)
    }


}

/*
POST api/auth/login
{
    u_id
    u_password
}
*/
exports.login = async (ctx) => {
    const { u_id, u_password } = ctx.request.body;

    if(!u_id || !u_password){
        ctx.status = 401
        return
    }

    try{
        let query = `SELECT * FROM USER WHERE u_id = "${u_id}"`
        res = await DB('GET', query)
     
        if (!res.row) {
            ctx.status = 401
            return
        }

        passwdCheck = await bcrypt.compare(u_password, res.row[0].u_password)
        if(!passwdCheck){
            ctx.status = 401
            return
        }
        console.log(u_id, u_password)

        ctx.body = res

        const token = jwt.sign(
            {
                id: u_id,
            },
            process.env.JWT_SECRET, {
            expiresIn: "3d",
        }
        )

        //DELETE HASH PASSWORD
        ctx.cookies.set("access_token", token, {
            //3일동안 유효
            maxAge: 1000 * 60 * 60 * 24 * 3,
            httpOnly: true,
        })




    }
    catch(err){
        ctx.throw(500,err)
    }

}


/*
GET api/auth/check
*/
exports.check = async(ctx) => {
    const {user} = ctx.state
    if(!user){
        ctx.status = 401
        return
    }
    ctx.body = user
}
/*
get api/auth/register
*/

exports.logout = async (ctx) => {
    ctx.cookies.set("access_token")
    ctx.status = 204
}