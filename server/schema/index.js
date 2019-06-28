const { makeExecutableSchema } = require('apollo-server');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
