angular.module("TableFactory", [])
  .factory('TableFactory', tableFactory)


function tableFactory(){
  tablePrototype = {
    tables: {},
    rows: {},
    length: 0,
    current: null
  };

  tablePrototype.addTable = function(table){
    this.tables[table] = {
      columns: [],
      columnCount: 0,
      rows: [],
      rowCount: 0
    }
    this.current = table;
    console.log("your tables: ", this.tables);
    console.log("current table: ", this.current);
  };

  tablePrototype.addColumn = function(column){
    let table = this.tables[this.current];
    let o = {};

    if(column === 'id'){
      table.columns.push('id');
    }else if(column === 'createdAt' || column === 'updatedAt'){
      o[column] = 'date';
      table.columns.push(o);
    }else{
      o[column] = 'STRING'
      table.columns.push(o);
    }
    table.columnCount += 1;
  };

  tablePrototype.addRow = function(table){
    table = table || this.current;
    let tableObj = this.tables[table];
    let len = tableObj.columnCount;
    let row = tableObj.rows[tableObj.rowCount] = {};
    let rowObj = row[table] = {};
    let key;

    rowObj['id'] = tableObj.rowCount + 1;
    tableObj.rowCount += 1;

    for(let i = 1; i < len; i++){
      console.log(tableObj.columns[i]);
      key = Object.keys(tableObj.columns[i]);
      //if(tableObj.columns[i][key] === 'date'){
        rowObj[key] = 'Not yet initialized';
      //}
    }
  };

  tablePrototype.dropTable = function(table){
    delete this.tables[table];
    this.current = null;
    console.log("your tables: ", this.tables);
    console.log("current table: ", this.current);
  };

  return tablePrototype;
}
