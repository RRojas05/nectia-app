const bcrypt = require("bcrypt");

const encrypt = async (password) => {
  return new Promise((resolve, reject) => {
    const hash = bcrypt.hash(password, 10);
    resolve(hash);
  });
};

const compare = async (plainPassword, hashPassword) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

module.exports = { encrypt, compare };
