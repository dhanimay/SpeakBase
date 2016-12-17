const app = angular.module("myApp",
 ["ngRoute", "HomeController"]);

 app.config(configure);


 function configure($routeProvider, $locationProvider){

   $routeProvider
   .when("/", {
     templateUrl: './partials/home.html',
     controller: 'HomeController'
   })
   .when("/login", {
     templateUrl: './partials/login.html',
     controller: 'HomeController'
   });


 }
