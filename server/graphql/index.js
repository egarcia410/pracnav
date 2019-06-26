const { makeExecutableSchema } = require('apollo-server');

const AuthModule = require('./modules/authModule');

module.exports = makeExecutableSchema({
  typeDefs: [AuthModule.typeDefs],
  resolvers: AuthModule.resolvers
});
