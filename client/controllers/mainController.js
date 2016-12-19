"use strict";
angular
  .module("MainController", ["ngRoute"])
  .controller("MainController", ["$scope", '$http', 'AuthService', 'UserFactory', 'QueryService', mainController]);



  function mainController(scope, http, AuthService, UserFactory, QueryService){
    let tableDefined = false;
    initAnnyang();
    scope.username = UserFactory.name;


    function initAnnyang(){
      let commands = {
        'speak base create table *tag': createTableGate,
        'speak base add column *tag': QueryService.addColumn,
        'speak base submit table': QueryService.submitTable,
        'hi' : QueryService.tester
      };

      // initialize annyang, overwriting any previously added commands
      annyang.addCommands(commands);
      annyang.debug(true);
      annyang.start();
      console.log("speak base is running");
    }

    function createTableGate(tag){
      if(!tableDefined){
        console.log("the tag given", tag);
        QueryService.assignTableName(tag);
        tableDefined = true;
      }else{
        responsiveVoice.setDefaultVoice("Australian Female");
        responsiveVoice.speak('You have a table that is still pending. Submit your pending table or say drop table to start over.');
      }
    }
  }
