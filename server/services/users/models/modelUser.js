const { getDatabase } = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");
const { encrypt, decrypt } = require("../helpers/encrypt");

class Model {
  static getCollections() {
    const db = getDatabase();
    const users = db.collection("Users");
    return users;
  }

  static async createUser(
    username,
    email,
    password,
    role,
    phoneNumber,
    address
  ) {
    const hashedPassword = encrypt(password);

    return this.getCollections().insertOne({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
      phoneNumber: phoneNumber,
      address: address,
    });
  }

  static async findAllUsers(id) {
    return this.getCollections().find().toArray();
  }

  static async findUserById(id) {
    return this.getCollections().findOne({
      _id: new ObjectId(id),
    });
  }

  static async deleteUserById(id) {
    return this.getCollections().deleteOne({
      _id: new ObjectId(id),
    });
  }
}

module.exports = Model;
