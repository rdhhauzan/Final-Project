const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const userScheme = require("./schemes/userScheme");

const server = new ApolloServer({
  typeDefs: [userScheme.typeDefs],
  resolvers: [userScheme.resolvers]
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
