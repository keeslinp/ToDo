angular.module('ToDoApp').controller('ListController', function ListController($scope,$state,user,$http) {
  $scope.username = user.getUsername();
  $scope.tasks = [];

  $http.post("getTasks.php",{'username':user.getUsername(),'password':user.getPassword()}).then(function (response)
  {
      $scope.tasks = response.data.tasks;
      console.log($scope.tasks);
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
});
