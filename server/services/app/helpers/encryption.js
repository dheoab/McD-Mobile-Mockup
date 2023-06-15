const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, salt);
};

const comparePassword = (plainPassword, hashedpassword) => {
  return bcrypt.compareSync(plainPassword, hashedpassword);
};

module.exports = { hashPassword, comparePassword };
