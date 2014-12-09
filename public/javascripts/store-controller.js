(function(){
  jsCart.init();
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
    $scope.cartVisible = false; // no longer in use, foundation modal handles showing cart.
    
    this.addItemToCart = function(item){
      if(typeof item.quantity === 'number' && item.quantity > 0){
        jsCart.addToCart(item._id, item.name, item.quantity, item.price.toFixed(2));
        updateCart();
        item.quantity = '';
        $("#cartModal").foundation('reveal','open');
      }else{
        alert('Please enter a number greater than 0');
      }
    }
    
    this.removeItem = function(id){
      jsCart.removeItem(id);
      updateCart();
    }
    
    //no longer in use, foundation modal handles showing cart.
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
  storeControllers.controller('ProductController', ['$http', '$scope', '$location', function($http, $scope, $location){
    $scope.category = '';  
    $scope.itemList = getProducts();

    function getProducts(){
      $scope.category = $location.path().replace('/', '');
      $http.get('/api/'+$scope.category, {cache: true}).success(function(data){
        $scope.itemList = data; 
      });
    }
    
  }]);
  
  //form controller
  storeControllers.controller('FormController', ['$http', '$scope', function($http, $scope){
   $scope.formData = {};
   $scope.response = {};
  
   this.postForm = function(){
    if(jsCart.getAllItems().length == 0){
      alert('Your cart is currently empty! Add some items to continue');
      $("#checkoutModal").foundation('reveal','close');
    }else{
      $http.post('/api/process-order', {
        cart: jsCart.getAllItems(),
        total: jsCart.total(), // this is not safe, server should calculate total in a real app. Usage of jsCart.total like this is for ease of demo purposes only.
        form: $scope.formData
       }).success(function(data){
         $scope.response = data;
         $scope.formData = {};
         resetAfterOrder();
     });
    }
   }
   
   function resetAfterOrder(){
     jsCart.removeAllItems();
     $scope.$parent.cartSize = 0;
     $scope.$parent.cart = jsCart.getAllItems();
   }
    
  }]);

})();
