(function(){
  jsCart.init();
  var app = angular.module('gemStore');
  
  app.controller('CartController', ['$scope', function($scope){
    //hide itemList until populated
    $scope.cartSize = jsCart.getCartSize();
    $scope.cart = jsCart.getAllItems();
    $scope.cartTotal = jsCart.total();
    
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