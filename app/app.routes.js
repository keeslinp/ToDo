angular.module('ToDoApp').config(function($stateProvider,$urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider.
  state('tasks', {
    url: '/tasks',
    templateUrl: '/app/components/tasks/tasks.html',
    controller: 'ListController'
  }).
  state('login',{
    url: '/login',
    templateUrl: 'app/components/login/login.html',
    controller: 'LoginController'
  });
});
