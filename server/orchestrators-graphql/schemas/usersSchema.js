const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis(
  process.env.BASE_PORT_REDIS,
  process.env.BASE_URL_REDIS
);

const USER_BASE_URL = process.env.USER_BASE_URL || `http://localhost:4001`;

const typeDefs = `#graphql
type User {
    _id : ID,
    username : String,
    email : String,
    password : String,
    role : String,
    phoneNumber : String,
    address : String
}

input newUser {
    username : String,
    email : String,
    password : String,
    role : String,
    phoneNumber : String,
    address : String
}

type Query {
    users : [User],
    user(id : ID!) : User,

}

type deleteUserResponse {
  msg : String
}

type Mutation {
    addUser(newUser : newUser): User 
    deleteUser(userId: ID!): deleteUserResponse
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        // let usersCache = await redis.get("users:get");

        let data;

        // if (usersCache) {
        //   data = JSON.parse(usersCache);

        //   console.log("masuk if");

        //   return data.data;
        // } else {
        const response = await axios.get(`${USER_BASE_URL}/users`);

        data = response.data;

        console.log("masuk else");

        console.log(data, "ini data");

        // redis.set("users:get", JSON.stringify(data));

        return data.data;
        // }
      } catch (error) {
        console.log(error);
      }
    },

    user: async (_, { id }) => {
      try {
        console.log(id, "ini ID");

        const { data } = await axios.get(`${USER_BASE_URL}/users/${id}`);
        console.log(data, "ini data");

        // return data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      const { newUser: newUser } = args;
      const { username, email, password, role, phoneNumber, address } = newUser;

      try {
        const { data } = await axios.post(`${USER_BASE_URL}/users/`, {
          username: username,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          address: address,
          role: role,
        });

        console.log(data, "data dari AddUser");

        redis.del("users:get");
        return data;
      } catch (error) {}
    },
    deleteUser: async (_, { userId }) => {
      try {
        const { data } = await axios.delete(`${USER_BASE_URL}/users/${userId}`);
        console.log(data);

        redis.del("users:get");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
