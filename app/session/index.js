'use strict';

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('../config');
const db = require('../db');

if (process.env.NODE_ENV === 'production') {
  //Initialize session with settings for production
  module.exports = session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false, //false on prduction
    store: new MongoStore({
      mongooseConnection: db.Mongoose.connection
    })//redis recommened  for this
  });
} else {
  //Initialize session with settings for dev
  module.exports = session({
    secret: config.sessionSecret, //signed our session cookie
    resave: false, //true is deafult this means middleware will each time attempt to save session even if they are not cchanged
    saveUninitialized: true //false on prduction
  });
}
