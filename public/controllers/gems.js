(function(){
  jsCart.init();
  var app = angular.module('gemStore',[]);
  
  app.controller('GemController', ['$http', '$scope', function($http, $scope){
    $scope.itemList = [];
    $scope.cartSize = jsCart.getCartSize();
    $scope.cart = jsCart.getAllItems();
    $scope.cartTotal = jsCart.total();
    
    this.getGems = function(){    
      $http.get('/api/gems', {cache: true}).success(function(data){
        $scope.itemList = data;   
      });
    }
    
    this.getMinerals = function(){    
      $http.get('/api/minerals', {cache: true}).success(function(data){
        $scope.itemList = data;
      });
    }
    
    this.addItemToCart = function(item){
      if(typeof item.quantity === 'number'){
        jsCart.addToCart(item._id, item.name, item.quantity, item.price.toFixed(2));
        updateCart();
        item.quantity = '';
      }else{
        alert('Please enter a number');
      }
    }
    
    this.removeItem = function(id){
      jsCart.removeItem(id);
      updateCart();
    }
    
    //helper functions
    function updateCart(){
      $scope.cart = jsCart.getAllItems();
      $scope.cartSize = jsCart.getCartSize();
      $scope.cartTotal = jsCart.total();
    }
     
  }]);

})();