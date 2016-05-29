var ToDoApp = angular.module('ToDoApp', ['ngAnimate','ui.router']);


ToDoApp.config(function($stateProvider,$urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider.
  state('tasks', {
    url: '/tasks',
    templateUrl: 'tasks.html',
    controller: 'ListController'
  }).
  state('login',{
    url: '/login',
    templateUrl: 'login.html',
    controller: 'LoginController'
  });
});

ToDoApp.controller('ListController', function ListController($scope,$state,user,$http) {
  $scope.username = user.getUsername();
  $scope.tasks = [];
  $http.post("getTasks.php",{'username':user.getUsername(),'password':user.getPassword()}).then(function (response)
  {
      for(task in response.data.tasks)
      {
        $scope.tasks.push({text:response.data.tasks[task],u_id:guid()});
      }
  });
  //$scope.tasks = [{text:"Example Task. Check me off to complete me :).",u_id:guid()}];
  $scope.addTask = function () {
    $scope.tasks.push({text:$scope.newTask,u_id:guid()});
    $scope.newTask = '';
  };
  $scope.completeTask = function(index){
    //TODO figure out how to remove item at end of animation
    $scope.tasks.splice(index,1);
    //$scope.checked=false;
    //$scope.tasks[index].done=($scope.tasks[index].done=='' ? 'done' : '');
    };
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

ToDoApp.controller('LoginController', function LoginController($scope,$state,$http, user){
  $scope.login = function() {
    $http.post("login.php",{"username":$scope.username,"password":$scope.password})
   .then(function (response) {
     if(response.data.success=="true")
     {
       user.setUsername($scope.username);
       user.setPassword($scope.password);
       $state.go("tasks");
     }else{
       $scope.message = "Wrong username/password, try again.";
     }
   });
  };
});

ToDoApp.service('user', function(){
  var username = "";
  var password = "";

  return{
    getUsername: function(){
      return username;
    },
    setUsername: function(name){
      username=name;
    },
    getPassword: function(){
      return password;
    },
    setPassword: function(word){
      password=word;
    }
  };
});
