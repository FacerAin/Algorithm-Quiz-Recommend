const Koa = require("koa");
const Router = require("koa-router");
const api = require("./src/api");
const bodyParser = require("koa-bodyparser");
const morgan = require("koa-morgan");
const fs = require('fs')
require("dotenv").config();
const { SERVER_PORT} = process.env;


const app = new Koa();
const router = new Router();
const accessLogStream = fs.createWriteStream(__dirname + "/access.log", {
    flags: "a",
  });
app.use(bodyParser());
app.use(morgan("combined", { stream: accessLogStream }));

router.use("/api", api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(SERVER_PORT, () => {
    console.log("Server is running on port", process.env.SERVER_PORT);
  });


