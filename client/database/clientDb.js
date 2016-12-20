"use strict";
const Sequelize = require('sequelize');
const sequelize = new Sequelize('speakbase', 'root', '2323');

let Table;
const db = {};
const schema = {};

db.createTable = function(input){

  for(let key in input.schema){
    if(key === 'id'){
      input.schema[key] = { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true};
      continue;
    }
    schema[key] = Sequelize[input.schema[key]];
  }

  Table = sequelize.define(input.tableName, schema);
  Table.sync();
  console.log(Table);
};

// db.isValid = function(data){
//   return Table.findOne();
// }

db.dropTable = function(name){
  Table.drop();
};

db.addRow = function(input){

  Table.sync().then(function() {
    console.log("in clientDb file");
     return Table.create(schema);
  });
}

module.exports = db;
