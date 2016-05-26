var ToDoApp = angular.module('ToDoApp', []);

ToDoApp.controller('TaskListController', function TaskListController($scope) {
  $scope.tasks = ['test','test2','test3'];
  $scope.addTask = function () {
    $scope.tasks.push($scope.newTask);
    $scope.newTask = '';
  };
  $scope.removeTask = function(index){
    $scope.tasks.splice(index,1);
    $scope.checked=false;
  };
});
