angular.module("UserFactory", [])
  .factory('UserFactory', UserFactory)


function UserFactory(){
  return {
    name: "",
    database: {}
  }
}