"use strict";
angular
.module("QueryService", [])
.factory('QueryService', [ '$http', service]);



function service(http) {
  let service = {};
  let tableInfo = {tableName: "",  schema: {}};
  let main = document.querySelector('body .main');

  service.createTable = function(input) {
    console.log('Annyang is hearing this tag: ', tag);
    let div = document.createElement('div');
    div.innerHTML = "This was just created";
    main.appendChild(div);

    return http.post('/createTable', JSON.stringify(input));
  };

  service.assignTableName = function(name){
    tableInfo.tableName = name;
    console.log("tableInfo", tableInfo);
  };

  service.addColumn = function(column){
    tableInfo.schema[column] = "STRING";
    console.log("tableInfo", tableInfo);
  };

  service.submitTable = function(){
    console.log("should submitTable");
    http.post('/createTable', tableInfo);
  };

  service.tester = function(){
    console.log("annyang is listening!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  };

  return service;
}
