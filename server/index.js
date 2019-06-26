const { ApolloServer } = require('apollo-server');

const schema = require('./graphql');
const knex = require('./knexfile');

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return { knex };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
