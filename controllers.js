angular.module('ToDoApp', ['ngAnimate','ui.router']).config(function($stateProvider,$urlRouterProvider) {

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
})

.controller('ListController', function ListController($scope,$state,user,$http) {
  $scope.username = user.getUsername();
  $scope.tasks = [];
  $http.post("getTasks.php",{'username':user.getUsername(),'password':user.getPassword()}).then(function (response)
  {
      $scope.tasks = response.data.tasks;
      console.log($scope.tasks);
  });
  $scope.addTask = function () {
    $scope.tasks.push({text:$scope.newTask,u_id:guid()});
    $scope.newTask = '';
    $http.post("addTasks.php",{'username':user.getUsername(),'password':user.getPassword(),'task':$scope.tasks[$scope.tasks.length-1]}).then(function (response){
      console.log(response.data.report);
    });
  };
  $scope.completeTask = function(index){
    $scope.tasks.splice(index,1);
    $http.post("removeTasks.php",{'username':user.getUsername(),'password':user.getPassword(),'id':index})
  };
})

.controller('LoginController', function LoginController($scope,$state,$http, user){
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
})

.service('user', function(){
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
})

.directive('tdaTasks', function(){
  return{
        templateUrl: '/taskListTemplate.html'
  };
})

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
