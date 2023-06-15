// const Model = require("../models/model");
const Redis = require("ioredis");
const axios = require("axios");

const redis = new Redis(6379, "127.0.0.1");

const USER_SERVER_URL = process.env.USER_SERVER_URL || "http://localhost:3000";

class Controller {
  static async createUser(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;

      const response = await axios.post(`${USER_SERVER_URL}/users/`, {
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });

      redis.del("users:get");

      res.status(201).json({
        statusCode: 201,
        data: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async findAllUsers(req, res, next) {
    try {
      let usersCache = await redis.get("users:get");

      let data;

      if (usersCache) {
        data = JSON.parse(usersCache);

        return res.status(200).json(data);
      } else {
        const response = await axios.get(`${USER_SERVER_URL}/users/`);
        data = response.data;

        redis.set("users:get", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async findUserById(req, res, next) {
    try {
      const { id } = req.params;

      console.log(id);

      let userCache = await redis.get(`userId${id}:get`);

      let data;

      if (userCache) {
        data = JSON.parse(userCache);

        console.log("dari If", data);

        return res.status(200).json(data);
      } else {
        const response = await axios.get(`${USER_SERVER_URL}/users/${id}`);
        data = response.data;

        console.log("dari Else");

        redis.set(`userId${id}:get`, JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUserById(req, res, next) {
    try {
      const { id } = req.params;

      await axios.delete(`${USER_SERVER_URL}/users/${id}`);

      redis.del(`userId${id}:get`);

      res.status(201).json({
        msg: "Delete successfull",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
