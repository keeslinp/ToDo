var ToDoApp = angular.module('ToDoApp', ['ngAnimate','ngRoute']);


ToDoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/tasks', {
    templateUrl: 'tasks.html',
    controller: 'ListController'
  }).
  otherwise({
    redirectTo: '/tasks'
  });
}]);

ToDoApp.controller('ListController', function ListController($scope) {
  $scope.tasks = [{text:"Example Task. Check me off to complete me :).",u_id:guid()}];
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
