const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
  typeDefs: usersTypeDefs,
  resolvers: usersResolves,
} = require("./schemas/usersSchema");

const {
  typeDefs: itemsTypeDefs,
  resolvers: itemsResolves,
} = require("./schemas/itemsSchema");

const server = new ApolloServer({
  typeDefs: [usersTypeDefs, itemsTypeDefs],
  resolvers: [usersResolves, itemsResolves],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
