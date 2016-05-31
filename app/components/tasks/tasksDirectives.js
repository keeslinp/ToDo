
angular.module("ToDoApp").directive('tdaTasks', function(){
  return{
        templateUrl: 'app/components/tasks/taskListTemplate.html'
  };
}).

directive('tdaTimer', ['$interval', function($interval) {

  function link(scope, element, attrs) {
    var timeoutId;
    var time = 0;
    function updateTime() {
      element.text(time++ + " second"+(time==2?"":"s") + " since you started the task.");
    }

    element.on('$destroy', function() {
      $interval.cancel(timeoutId);
    });

    // start the UI update process; save the timeoutId for canceling
    timeoutId = $interval(function() {
      updateTime(); // update DOM
    }, 1000);
    updateTime();
  }

  return {
    link: link
  };
}]);
