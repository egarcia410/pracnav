let environment = process.env.NODE_ENV || 'development';
const { DB_NAME } = require('./config');
let connOptions = {
  development: {
    client: 'pg',
    connection: `postgres://localhost/${DB_NAME}`
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }
};

module.exports = require('knex')(connOptions[environment]);
