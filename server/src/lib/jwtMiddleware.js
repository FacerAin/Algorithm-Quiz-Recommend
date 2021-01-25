const jwt = require("jsonwebtoken");


const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get("access_token");

  if (!token) {
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = {
      id: decoded.id,
    };
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 2.5) {
        const token = jwt.sign(
            {
                id: decoded.id,
            },
            process.env.JWT_SECRET, {
            expiresIn: "3d",
        }
        )

      ctx.cookies.set("access_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, //7days
        httpOnly: true,
      });
    }

    return next();
  } catch (e) {
    return next();
  }
};
module.exports = jwtMiddleware;