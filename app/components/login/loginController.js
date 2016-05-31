angular.module('ToDoApp').controller('LoginController', function LoginController($scope,$state,$http, user){
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
