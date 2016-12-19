"use strict";
const Sequelize = require('sequelize');

//const sequelize = new Sequelize('mysql://localhost:8000/speakbase', {});
const sequelize = new Sequelize('speakbase', 'root', '2323');

let User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

const db = {};

db.isValid = function(data){
  return User.findOne({username: data.username});
}

db.create = function(data){
  
  return User.sync().then(function() {
    console.log("in sequelize file");
     return User.create({
      username: data.username,
      password: data.password
    });
  });
}

module.exports = db;
