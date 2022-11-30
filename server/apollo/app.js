import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import userScheme from "./schemes/userScheme"

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
  }).then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  });