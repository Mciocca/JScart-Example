(function(){
  jsCart.init();
  var app = angular.module('gemStore',[]).directive('cart', function(){
   return {
     restrict: 'E',
     transclude: true,
     templateUrl: '/directives/cart.html'
   }
  });
  
  app.controller('StoreController', ['$http', '$scope', function($http, $scope){
    //hide itemList until populated
    $scope.itemList = false;
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
      if(typeof item.quantity === 'number' && item.quantity > 0){
        jsCart.addToCart(item._id, item.name, item.quantity, item.price.toFixed(2));
        updateCart();
        item.quantity = '';
      }else{
        alert('Please enter a number greater than 0');
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