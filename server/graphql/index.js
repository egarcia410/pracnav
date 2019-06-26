const { makeExecutableSchema } = require('apollo-server');

const UsersModule = require('./modules/usersModule');

module.exports = makeExecutableSchema({
  typeDefs: [UsersModule.typeDefs],
  resolvers: {
    Query: {
      ...UsersModule.Query
    },
    Mutation: {
      ...UsersModule.Mutation
    }
  }
});
