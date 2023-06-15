const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authN = async (req, res, next) => {
  try {
    // console.log(req.headers, "<<< ini req.headers");
    let access_token = req.headers.access_token;

    // console.log(access_token);
    if (!access_token) {
      throw { name: "notLogged" };
    }

    const payload = verifyToken(access_token);

    // console.log(payload, "ini payload");
    const userId = payload.id;

    const user = await User.findByPk(userId);

    // console.log(user);
    if (!user) {
      throw { name: "invalidToken" };
    }

    req.userData = {
      userId: user.id,
      userRole: user.role,
      username: user.username,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authN;
