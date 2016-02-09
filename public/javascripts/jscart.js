/*
   This library uses sessionStorage to create a simple shopping cart on the user's browser.

   sessionStorage is widely supported by modern browsers, and is supported by IE8+.
   sessionStorage is currently NOT supported b Opera Mini.
   
   IMPORTANT:
   Because the shopping cart is client side, you must assume that the user has modified
   the cart in sessionStorage before processing their order. It is important to have the user
   check their cart before processing the sale, and not to trust the prices that are currently
   in the cart. The cart should be used to store item information to show the user. Use the item IDs 
   saved to the cart to process the order only after the user confirms their order is correct.

   Created by Michael Ciocca
   http://github.com/mciocca
 */

var jsCart = function (sessionStorage) {
  //check to see if item exists. Used before adding or removing items from sessionStorage.
  //Save item location if found. This prevents searching for it a second time unnecessarily.
  var itemLocation = 0;
  function itemExists(productId, cart) {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === productId) {
        itemLocation = i;
        return true;
      }
    }
  }

  //get the current contents of the cart as an array of objects
  function getCart() {
    return JSON.parse(sessionStorage.getItem('jsCart'));
  }
  //update session storage with changes to the cart
  function saveCart(cart) {
    sessionStorage.setItem('jsCart', JSON.stringify(cart));
  };

  return {
    //create an empty cart in sessionStorage. Takes an optional callback
    init: function (callback) {
      if(!sessionStorage.getItem('jsCart')) {
        sessionStorage.setItem('jsCart', '[]');
        if(typeof callback === 'function'){
          callback();
        };
      }
    },
    
    //adds items to the cart
    addToCart: function (productId, product, amount, cost) {
      var cart = getCart();
      if (itemExists(productId, cart)) {
        this.updateQuantity(productId, amount);
      } else {
        var transaction = {
          id: productId,
          item: product,
          quantity: amount,
          price: cost
        };
        cart.push(transaction);
        saveCart(cart);
      }
    },

    updateQuantity: function (productId, amount) {
      var cart = getCart();
      if (itemExists(productId, cart)) {
        cart[itemLocation].quantity = amount;
        saveCart(cart);
      }
    },

    removeItem: function (productId) {
      var cart = getCart();
      if (itemExists(productId, cart)) {
        cart.splice(itemLocation, 1);
        saveCart(cart);
      }
    },

    //get total for all products in the cart
    total: function () {
      var total = 0,
      cart = getCart();
      for (var i = 0; i < cart.length; i++) {
        total += (cart[i].quantity * cart[i].price);
      }
      return total.toFixed(2);
    },

    //get the total number of products in the cart
    getCartSize: function () {
      var cart = getCart(),
      totalItems = 0;
      for (var i = 0; i < cart.length; i++) {
        totalItems += parseInt(cart[i].quantity);
      }
      return totalItems;
    },

    //returns cart as an array of javascript objects
    getAllItems: function () {
      return getCart();
    },
    
    removeAllItems : function(){
      sessionStorage.removeItem('jsCart');
      this.init();
    }

    //end of return object
  }
}(sessionStorage);

