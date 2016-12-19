"use strict";
const Sequelize = require('sequelize');
const sequelize = new Sequelize('speakbase', 'root', '2323');

let Table;
const db = {};
const schema = {};

db.createTable = function(input){

  for(let key in input.schema){
    schema[key] = Sequelize[input.schema[key]];
  }

  Table = sequelize.define(input.tableName, schema);
};

// db.isValid = function(data){
//   return Table.findOne();
// }

db.createRow = function(input){

  return Table.sync().then(function() {
    console.log("in clientDb file");
     return Table.create(input);
  });
}

module.exports = db;
