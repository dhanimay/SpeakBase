"use strict";
angular
.module("QueryService", [])
.factory('QueryService', [ '$http', service]);



function service(http) {
  let service = {};
  let tableInfo = {tableName: "",  schema: {}};

  service.assignTableName = function(name){
    tableInfo.tableName = name;
    console.log("tableInfo", tableInfo);
  };

  service.addColumn = function(column){
    if(column === 'id'){
      tableInfo.schema[column] = `id`;
      return;
    }

    tableInfo.schema[column] = "STRING";
    console.log("tableInfo", tableInfo);
  };

  service.submitTable = function(){
    console.log("Speech Recognized: speak base submit table");
    http.post('/createTable', tableInfo);
  };

  service.addRow = function(){
    http.post('/addRow', tableInfo);
  }

  service.dropTable = function(name){
    http.delete('/dropTable', name);
  };

  return service;
}
