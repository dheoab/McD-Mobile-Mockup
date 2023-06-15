const Model = require("../models/modelUser");

class Controller {
  static async createUser(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;

      console.log(req.body, "ini reqbody");

      const newUser = await Model.createUser(
        username,
        email,
        password,
        role,
        phoneNumber,
        address
      );

      console.log(newUser.insertedId, "ini newUser");

      res.status(201).json({
        statusCode: 201,
        id: newUser.insertedId,
        username,
        email,
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async findAllUsers(req, res, next) {
    try {
      console.log("testing");
      const allUsers = await Model.findAllUsers();

      console.log("masuk Controller findALlUser");
      console.log(allUsers);

      res.status(200).json({
        statusCode: 200,
        data: allUsers,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async findUserById(req, res, next) {
    try {
      const { id } = req.params;

      const user = await Model.findUserById(id);

      res.status(200).json({
        statusCode: 200,
        data: user,
      });
    } catch (error) {}
  }

  static async deleteUserById(req, res, next) {
    try {
      const { id } = req.params;

      const deletedUser = await Model.deleteUserById(id);

      res.status(200).json({
        statusCode: 200,
        msg: "Delete Successfull",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
