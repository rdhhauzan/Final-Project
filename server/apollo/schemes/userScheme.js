const axios = require("axios");
const userUrl = "http://localhost:3000/users/";
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const typeDefs = `#graphql

type File {
  filename: String
  mimetype: String
  encoding: String
}

scalar Date

input loginInput{
  email: String
  password: String
}
type login{
    access_token: String
    email: String
    id: ID
    username: String
}

type msg{
  msg: String
}

input editInput{
  username: String
  email: String
  password: String
  dob: String
  domisili: String
  gender: String
  profPict
}

input registerInput{
  username: String
  email: String
  password: String
  dob: Date
  domisili : String
  gender: String
}

type User{
    username: String
    email: String
    role: String
    password: String
    phoneNumber: String
    address: String
}

type Users{
    id: ID
    username: String
    email: String
    role: String
    password: String
    phoneNumber: String
    address: String
}

type Query {
    getUsers: [Users]
    getUserById(id: ID) : User
    uploads: [File]
}

type Mutation {
    loginUser(login:loginInput) : login
    registerUser(register:registerInput) : msg
    editUser(edit:editInput, id:ID) :msg
    singleUpload(file: Upload): File
}
`;

const resolverMap = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};

const resolvers = {
  Date: resolverMap,
  Query: {
    uploads: (parent, args) => {},
    getUsers: async () => {
      try {
        let { data } = await axios.get(userUrl);
        return data;
      } catch (error) {
        throw new GraphQLError("Internal Server Error");
      }
    },
    getUserById: async (_, args) => {
      try {
        const { id } = args;
        let { data } = await axios.get(userUrl + id);
        return data;
      } catch (error) {
        throw new GraphQLError("Internal Server Error");
      }
    },
  },
  Mutation: {
    singleUpload: (parent, args) => {
      return args.file.then((file) => {
        //Contents of Upload scalar: https://github.com/jaydenseric/graphql-upload#class-graphqlupload
        //file.createReadStream() is a readable node stream that contains the contents of the uploaded file
        //node stream api: https://nodejs.org/api/stream.html
        return file;
      });
    },
    registerUser: async (_, args) => {
      try {
        const { data } = await axios.post(userUrl + "register", args.register);
        return data;
      } catch (error) {
        throw new GraphQLError("Internal Server Error");
      }
    },
    editUser: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.put(userUrl + "edit/" + id, args.edit);
        return data;
      } catch (error) {
        throw new GraphQLError("Internal Server Error");
      }
    },
    // delUser: async (_, args) => {
    //   try {
    //     const { _id } = args;
    //     const { data } = await axios.delete(userUrl + _id);
    //     return data;
    //   } catch (error) {
    //     throw new GraphQLError("Internal Server Error");
    //   }
    // },
    loginUser: async (_, args) => {
      try {
        const { data } = await axios.post(userUrl + "login", args.login);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { resolvers, typeDefs };
