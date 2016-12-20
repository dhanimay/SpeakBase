"use strict";
angular
  .module("MainController", ["ngRoute"])
  .controller("MainController", ["$scope", '$http', 'AuthService',
  'UserFactory', 'QueryService', 'DomService', 'TableFactory', mainController]);



  function mainController(scope, http, AuthService, UserFactory, QueryService, DomService, TableFactory){
    let tableDefined = false;
    let dropCheck = false;
    let steps = 1;
    scope.currentTable = `Doesn't exist`;
    initAnnyang();
    scope.username = UserFactory.name;

    let testButton = document.querySelector('.testButton');
    testButton.addEventListener('click', (event)=>{
      if(steps === 1){
        createTableHandler('Redwood');
      }else if(steps === 2){
        addColumnHandler(`column${steps-1}`);
      }else if(steps < 5){
        addColumnHandler(`column${steps-1}`);
      }else if(steps === 7){
        submitTableHandler();
      }else if(steps < 9){
        addRowHandler();
      }else if(steps === 9){
        editRowHandler();
      }else if(steps === 10){
        dropTableHandler('Redwood');
      }else if(steps === 11){
        dropTableHandler('Redwood');
        steps = 0;
      }
      steps++;
    });


    function initAnnyang(){
      let commands = {
        'speak base create table *tag': createTableHandler,
        'speak base add column *tag': addColumnHandler,
        'speak base submit table': submitTableHandler,
        'speak base add entry': addRowHandler,
        'speak base submit rows': submitRowHandler,
        'speak base drop table *tag': dropTableHandler,
        'speak base edit row *tag': editRowHandler
      };

      // initialize annyang, overwriting any previously added commands
      annyang.addCommands(commands);
      annyang.debug(true);
      annyang.start();
      console.log("Speakbase has started.");
    }

    function addRowHandler(){
      console.log("Speech Recognized: speak base add entry");
      //QueryService.addRow();
      TableFactory.addRow();
      DomService.addRow();
    }

    function submitRowHandler(){

    }

    function editRowHandler(){
      responsiveVoice.setDefaultVoice("Australian Female");
      responsiveVoice.speak('Sure, which field?');
      let that = responsiveVoice;
      setTimeout((that)=>{
        responsiveVoice.speak('NO? Hmmph!');
      }, 6000);
    }

    function createTableHandler(tag){
      console.log("Speech Recognized: speak base create table *tag");
      console.log("with parameters: " + tag);
      if(!tableDefined){
        QueryService.assignTableName(tag);
        TableFactory.addTable(tag);
        DomService.addTable(tag);
        addColumnHandler('id');
        addColumnHandler('createdAt');
        addColumnHandler('updatedAt');
        scope.currentTable = tag;
        tableDefined = true;
      }else{
        responsiveVoice.setDefaultVoice("Australian Female");
        responsiveVoice.speak('You have a table that is still pending. Submit your pending table or say, drop table, to start over.');
      }
    }

    function dropTableHandler(tag){
      console.log("Speech Recognized: speak base drop table *tag");
      console.log("with parameters: " + tag);
      if(tableDefined){
        if(!dropCheck){
          responsiveVoice.setDefaultVoice("Australian Female");
          responsiveVoice.speak('Danger. Table will be dropped. To proceed issue your command once more.');
          dropCheck = true;
          setTimeout(()=>{
            dropCheck = false;
          },15000)
          return;
        }
        responsiveVoice.setDefaultVoice("Australian Female");
        responsiveVoice.speak(`I guess you didn't need that...`);
        QueryService.dropTable(tag);
        DomService.dropTable(tag);
        dropCheck = false;
        tableDefined = false;
      }else{
        responsiveVoice.setDefaultVoice("Australian Female");
        responsiveVoice.speak('There are no tables to drop.');
      }
    }

    function addColumnHandler(column){
      console.log("Speech Recognized: speak base add column *tag");
      console.log("with parameters: " + column);
      TableFactory.addColumn(column);
      QueryService.addColumn(column);
      DomService.addColumn(column);
    }

    function submitTableHandler(){
      console.log("Speech Recognized: speak base submit table");
      if(!tableDefined){
        responsiveVoice.setDefaultVoice("Australian Female");
        responsiveVoice.speak('You have not defined a table to create.');
      }else{
        QueryService.submitTable();
        DomService.submitTable();
        responsiveVoice.setDefaultVoice("Australian Female");
        responsiveVoice.speak(`Congratulations. Your table ${scope.currentTable}, has been created in our. my sequel database.`);
      }
    }
  }
