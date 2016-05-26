var ToDoApp = angular.module('ToDoApp', []);

ToDoApp.controller('TaskListController', function TaskListController($scope) {
  $scope.tasks = [{text:'test',done:''}];
  $scope.addTask = function () {
    $scope.tasks.push({text:$scope.newTask,done:''});
    $scope.newTask = '';
  };
  $scope.completeTask = function(index){
    //TODO figure out how to remove item at end of animation
    //$scope.tasks.splice(index,1);
    //$scope.checked=false;
    $scope.tasks[index].done=($scope.tasks[index].done=='' ? 'done' : '');
    };
});
