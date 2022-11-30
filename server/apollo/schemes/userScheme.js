const axios = require("axios");
// const userUrl = "https://p3-challenge-2-ivan-users-production.up.railway.app/users/";

// const typeDefs = `#graphql

// type User{
//     username: String
//     email: String
//     role: String
//     password: String
//     phoneNumber: String
//     address: String
// }

// input userInput{
//   username: String
//   email: String
//   role: String
//   password: String
//   phoneNumber: String
//   address: String
// }

// type Users{
//   _id: String
//   username: String
//   email: String
//   role: String
//   password: String
//   phoneNumber: String
//   address: String
// }

// type Query {
//   getUsers: [Users]
//   getUserById(id: ID) : User
// }

// type Mutation {
//     addUser(newUser: userInput) : User
//     delUser(_id: String) : User
//   }
// `;

// const resolvers = {
//   Query: {
//     getUsers: async () => {
//       try {
//         let { data } = await axios.get(userUrl);
//         return data;
//       } catch (error) {
//         throw new GraphQLError("Internal Server Error");
//       }
//     },
//     getUserById: async (_, args) => {
//       try {
//         const { id } = args;
//         let { data } = await axios.get(userUrl + id);
//         return data;
//       } catch (error) {
//         throw new GraphQLError("Internal Server Error");
//       }
//     },
//   },
//   Mutation: {
//     addUser: async (_, args) => {
//       try {
//         const { data } = await axios.post(userUrl, args.newUser);
//         return { msg: "User has been added" };
//       } catch (error) {
//         throw new GraphQLError("Internal Server Error");
//       }
//     },
//     delUser: async (_, args) => {
//       try {
//         const { _id } = args;
//         const { data } = await axios.delete(userUrl + _id);
//         return data;
//       } catch (error) {
//         throw new GraphQLError("Internal Server Error");
//       }
//     },
//   },
// };

module.exports = { resolvers, typeDefs };
