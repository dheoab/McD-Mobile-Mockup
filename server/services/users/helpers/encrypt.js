const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

const encrypt = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, salt);
};

const decrypt = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

module.exports = { encrypt, decrypt };
