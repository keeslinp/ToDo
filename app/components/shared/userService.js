angular.module('ToDoApp').service('user', function(){
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
