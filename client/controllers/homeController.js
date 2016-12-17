angular
  .module("HomeController", ["ngRoute"])
  .controller("HomeController", ["$scope", '$location', homeController]);

  const welcomeMessage = `Hello friend. it is very nice to see you. Please login to continue your work.
    New faces should instead access the signup menu.`;


  function homeController(scope, location){
    let path = location.path();
    if(path.indexOf('login') === -1){
      location.path = path + 'login';
      console.log("show this then");
    }
    init();
    scope.loginUsername = "username";
    scope.loginPassword = "password";

    scope.sayHello = sayHello;

  }

  function sayHello(){
    responsiveVoice.setDefaultVoice("Australian Female");
    responsiveVoice.speak(welcomeMessage);
  }

  function init(){
    let commands = {'hello :name': helloFunction};
    let commands2 = {'hi': helloFunction};

    // initialize annyang, overwriting any previously added commands
    annyang.init(commands, true);
    // adds an additional command without removing the previous commands
    annyang.init(commands2, false);
    annyang.start();
  }

  function helloFunction(){
    console.log("Your hello has responded");
  }
