angular.module("DomService", [])
  .factory('DomService', [ 'TableFactory', domService])

function domService(TableFactory){
  let service = {};
  let container = document.querySelector('body .tableContainer');
  let rows;
  let columns;
  let columnLength = 0;
  let tableTitle;


  service.addTable = function(name){
      TableFactory.addTable(name);
      container.removeEventListener('animationend', dropTableAnimation);
      container.innerHTML = `<h1 class='tableTitle'>${name}&nbsp;<span class='tableStatus'> (pending)</span></h1>
      <div class='databaseTable'><ul class='columns'></ul><div class='rows'></div>`;
      container.style.display = 'block';
      container.style.animation = " createDatabaseTable .8s";
      container.style.height = '800px';
      rows = container.querySelector('.rows');
      columns = container.querySelector('.columns');
      tableTitle = container.querySelector('.tableTitle');
  };

  service.addColumn = function(column){
    let li = document.createElement('li');
    li.innerHTML = `${column}`;
    columns.append(li);
    columnLength += 1;
  };

  service.addRow = function(){
    let table = TableFactory.tables[TableFactory.current];
    console.log("table", table);
    let row = table.rows[table.rowCount - 1];
    console.log("row: ", row);
    let rowObj = row[TableFactory.current];
    let len = table.columnCount;

    let ul = document.createElement('ul');
    ul.className = 'row';

    let enabled = 'enabled';
    let li = null;

    console.log('row keys', Object.keys(rowObj));
    for(let key in rowObj){
      li = document.createElement('li');
      if(key === 'createdAt' || key === 'updatedAt' || key === 'id') enabled = 'disabled';

      li.innerHTML = `<input type='text' value='${rowObj[key]}' ${enabled}></input>`;
      ul.appendChild(li);
      enabled = 'enabled';
    }
    rows.appendChild(ul);

  };

  service.dropTable = function(name){
    TableFactory.dropTable(name);
    container.style.animation = " dropDatabaseTable .8s";
    container.addEventListener('animationend', dropTableAnimation);
    columnLength = 0;
  };

  function dropTableAnimation(event){
    console.log('ending animation');
    container.style.height = '30px';
    container.style.display = 'none';
    container.style.opacity = '1';
    container.innerHTML = '';
    container.style.animation = '';
  }

  service.submitTable = function(){
    let status = tableTitle.querySelector('.tableStatus');
    status.innerHTML = '(ok)';
    status.style.color = '#4ec43e';
    setTimeout(()=>{
      status.style.display = 'none';
    }, 2000);
  };

  return service;
}
