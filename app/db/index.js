'use strict';

const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

//Log an error if the connection fails

Mongoose.connection.on('error', error => {
  console.log('Mongo Error ', error);
});

//Create a Schema that defines the structure for storing user data
const myUser = new Mongoose.Schema({
  profileId: String,
  fullname: String,
  profilePic: String
});

//Turn the schema into a usable model
let userModel = Mongoose.model('myUser', myUser);

module.exports = {
  Mongoose: Mongoose,
  userModel: userModel
}
