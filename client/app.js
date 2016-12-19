const app = angular.module("myApp",
 ["ngRoute", "HomeController", 'SignUpController', 'MainController', 'AuthService', 'UserFactory', 'QueryService']);

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
   })
   .when('/main', {
     templateUrl: './partials/main.html',
     controller: 'MainController'
   })
   .when('/signUp', {
     templateUrl: './partials/signUp',
     controller: 'SignUpController'
   });


 }
