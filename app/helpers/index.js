'use strict';

const db = require('../db');

//Find a single user
let findOne = profileID => {
  return db.userModel.findOne({
    'profileId': profileID
  });
}

//create a new user
let createNewUser = profile => {

  return new Promise((resolve, reject) => {
    let newUser = new db.userModel({
      profileId: profile.id,
      fullName: profile.displayName,
      profilePic: profile.photos[0].value || ''
    });

    newUser.save(error => {
      if (error) {
        reject(error);
      } else {
        console.log('new user',newUser);
        resolve(newUser)
      }
    })
  });
}

let findById = id => {
  return new Promise((resolve, reject) =>{
    db.userModel.findById(id, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
}

module.exports = {
  findOne: findOne,
  createNewUser: createNewUser,
  findById: findById
}
