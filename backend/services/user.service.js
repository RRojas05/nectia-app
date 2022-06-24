const {
  getUsers,
  createtUser,
  updateToken,
  getUserByEmail,
} = require("../controller/user.controller");
const { encrypt } = require("../helpers/handleBcrypt");

class UserService {
  constructor() {
    this.users = [];
  }

  async create(data) {
    const user = await this.findUserByEmail(data.email);
    const newpass = await encrypt(data.password);

    if (user) {
      return false;
    } else {
      data.password = newpass;
      const newUser = await createtUser(data);
      return newUser;
    }
  }

  async findAll() {
    return new Promise((resolve) => {
      const users = getUsers();
      resolve(users);
    });
  }
  async findUserByEmail(email) {
    const user = await getUserByEmail(email.toLowerCase().trim());

    if (!user || user.length == 0) {
      return false;
    }

    return user[0];
  }
  async updateToken(data) {
    const user = await updateToken(data);

    return user;
  }
}

module.exports = UserService;
