require("dotenv").config();
const jwt = require("jsonwebtoken");

const tokenSing = async (user) => {
  return jwt.sign(
    {
      name: user.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const decodeSing = (token) => {
  try {
    return jwt.decodeSing(token);
  } catch (error) {
    return null;
  }
};

module.exports = { tokenSing, decodeSing, verifyToken };
