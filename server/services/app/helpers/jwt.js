if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRET;

const createToken = (payload) => {
  return jwt.sign(payload, SECRETKEY); // payload => bisa pakai id dan username (bentuknya obj)
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRETKEY);
};

module.exports = { createToken, verifyToken };
