"use strict";
angular
.module("AuthService", [])
.factory('AuthService', [ '$http', 'UserFactory', auth]);



function auth(http, UserFactory) {
  let authService = {};

  authService.signUp = function (credentials) {
     return http.post('/addUser', JSON.stringify(credentials));
  };

  authService.login = function(credentials){
    return http.post('/validateUser', JSON.stringify(credentials));
  };

  return authService;
}
