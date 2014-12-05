(function(){
    jsCart.init('hello');
jsCart.test('hi');
  var storeControllers = angular.module('storeControllers',[]).directive('cart', function(){
   return {
     restrict: 'E',
     transclude: true,
     templateUrl: '/directives/cart.html'
   }
  });
  
    //cart controller
  storeControllers.controller('CartController', ['$scope', function($scope){
    $scope.cartSize = jsCart.getCartSize();
    $scope.cart = jsCart.getAllItems();
    $scope.cartTotal = jsCart.total();
    $scope.cartVisible = false;
    
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
    
    this.toggleCart = function(){
      $scope.cartVisible = !$scope.cartVisible;
    }
    
    //helper functions
    function updateCart(){
      $scope.cart = jsCart.getAllItems();
      $scope.cartSize = jsCart.getCartSize();
      $scope.cartTotal = jsCart.total();
    }
     
  }]);
    
 //Products controller    
  storeControllers.controller('ProductController', ['$http', '$scope', function($http, $scope){
     $scope.itemList = getProducts();
     $scope.category = ''; 
              
    function getProducts(){
      $scope.category = document.URL.split('/')[4];
      $http.get('/api/'+$scope.category, {cache: true}).success(function(data){
        $scope.itemList = data; 
      });
    }
      
  }]);

})();