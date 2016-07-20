'use strict';

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config');
const h = require('../helpers');

module.exports = () => {

  //creating a sesssion with only user id, this id is from mongodb
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    //Find the user id from mongodb
    h.findById(id)
      .then(user => done(null, user))
      .catch(error => console.log('Error when deserailizing user'));
  });

  let authProcessor = (accessToken, refreshToken, profile, done) => {
    //Find a user in the local db using profile.id
    //if the usee is found, return the user data using the done()
    //if th user is not found , crteate one in the local db and return
    h.findOne(profile.id)
      .then(result => {
        if (result) {
          done(null, result);
        } else {
          //create a new user and return
          h.createNewUser(profile)
            .then(newUser => done(null, newUser))
            .catch(error => console.log('Error when creating new user'));
        }
      });
  }

  passport.use(new FacebookStrategy(config.fb, authProcessor));
}
