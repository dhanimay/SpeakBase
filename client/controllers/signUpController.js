"use strict";
angular
  .module("SignUpController", ["ngRoute"])
  .controller("SignUpController", ["$scope", '$http', 'AuthService', 'UserFactory', signUpController]);



  function signUpController(scope, http, AuthService, UserFactory){
    scope.initAnnyang = initAnnyang;
    scope.http = http;
    scope.login = login;
    scope.signUpUsername = "username";
    scope.signUpPassword = "password";
    scope.clearText = clearText;

    function signUp(){
      let valid = AuthService.signUp({username: scope.loginUsername, password: scope.loginPassword})
        .then((result)=>{
          console.log("this is the returned valid", valid);
        });
    }
  }
