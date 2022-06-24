const boom = require("@hapi/boom");
const { verifyToken } = require("../helpers/generateToken");

const checkAuth = async (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(' ').pop();

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const tokenData = await verifyToken(token);

    if (tokenData.name) {
      next();
    } else {
      throw boom.unauthorized("Usuario no autorizado");
    }
  } catch (error) {
    next(boom.unauthorized("Usuario no autorizado"));
  }
};

module.exports = checkAuth;
