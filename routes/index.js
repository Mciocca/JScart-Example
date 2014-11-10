var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.html');
});

router.get('/check-out', function(req,res){
  res.render('checkout.html');
});

module.exports = router;