'use strict';

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'Big Bad Bike',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL: process.env.DATABASE_URL  || 'mongodb://dev:abcd1234@ds151450.mlab.com:51450/javthon-db'
};
