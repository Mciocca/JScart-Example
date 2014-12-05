$(document).foundation();
(function(){
  var app = angular.module('gemStore',['ngRoute', 'storeControllers']);
    
  app.config(['$routeProvider',
    function($routeProvider){
      $routeProvider. 
      when('/', {
        templateUrl : 'partials/home.html'
      }). 
      when('/gems', {
        templateUrl: 'partials/items.html',
        controller: 'ProductController' 
      }).  
      when('/minerals', {
        templateUrl: 'partials/items.html',
        controller: 'ProductController'
      })
    }]);
    

})();