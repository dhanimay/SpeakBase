"use strict";
angular
  .module("HomeController", ["ngRoute"])
  .controller("HomeController", ["$scope", '$location', '$http', 'AuthService', 'UserFactory', homeController]);

  const welcomeMessage = `Hello friend. it is very nice to see you. Please login to continue your work.
    New faces should instead access the signup menu.`;


  function homeController(scope, location, http, AuthService, UserFactory){

    console.log(scope);
    console.log(location);
    console.log(http);
    console.log(AuthService);
    console.log(UserFactory);

    let path = location.path();
    if(path.indexOf('login') === -1){
      location.url(path + 'login');
    }

    scope.initAnnyang = initAnnyang;
    scope.http = http;
    scope.login = login;
    scope.loginUsername = "username";
    scope.loginPassword = "password";
    scope.clearText = clearText;
    scope.sayHello = sayHello;

    function login(){
      AuthService.login({username: scope.loginUsername, password: scope.loginPassword})
        .then((res)=>{
          console.log("this is the returned valid", res);
          if(res.data){
            console.log("path",location.path());
            console.log("url", location.url('/main'));
            location.url('/main');
          }else{

          }
        });
    }
  }

  function clearText(element){
    console.log(element);
    if(element.value === "username" || element.value === "password") element.value = "";
  }

  function sayHello(http){
    responsiveVoice.setDefaultVoice("Australian Female");
    responsiveVoice.speak(welcomeMessage);
  }

  function initAnnyang(){
    let helloFunction = function(goods){
      console.log("show!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    }

    let poppit = function(){
      responsiveVoice.speak("The best thing ever");
    }


    let commands = {'speak base': helloFunction};
    let commands2 = {'carla is': poppit};

    // initialize annyang, overwriting any previously added commands
    annyang.addCommands(commands);
    // adds an additional command without removing the previous commands
    annyang.addCommands(commands2);
    annyang.debug(true);
    annyang.start();
    console.log("speakbase is running");
  }
