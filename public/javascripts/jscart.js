/*
   This library uses sessionStorage to create a simple shopping cart on the user's browser.
   It is highly recommended that you check prices against your database before
   allowing a transaction to complete. Any differences should be alerted to the user before completing.
   Product function arguments should be a unique identifer to the item being added to the cart.

   sessionStorage is widely supported by modern browsers, and is supported by IE as far back as IE8.

   The cart expects prices to be saved as decimals. Correct rounding and formatting should be handled by the server before inserting it
   into your html.

   The library was built with the idea of using data attributes and click events to pass data to it, however there will be many other effective solutions as well.

   IMPORTANT : This was built as a learning exercise, and may not be appropriate for a production application.

   Created by Michael Ciocca
   http://github.com/mciocca
   License: MIT
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
    //create an empty cart in sessionStorage.
    init: function (callback) {
      if (!sessionStorage.getItem('jsCart')) {
        sessionStorage.setItem('jsCart', '[]');
      }
      callback;
    },
    //this function should be modified to accept as many parameters as needed
    //or this could be modified to take an object, and expect that object to have an id key.
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
      var total = 0;
      var cart = getCart();
      for (var i = 0; i < cart.length; i++) {
        total += (cart[i].quantity * cart[i].price);
      }
      return total.toFixed(2);
    },

    //get the total number of products in the cart
    getCartSize: function () {
      var cart = getCart();
      var totalItems = 0;
      for (var i = 0; i < cart.length; i++) {
        totalItems += parseInt(cart[i].quantity);
      }
      return totalItems;
    },

    //returns cart as an array of javascript objects
    getAllItems: function () {
      return getCart();
    }

    //end of return object
  }
}(sessionStorage);