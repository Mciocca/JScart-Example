var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/gems', function(req, res) {
  var db = req.db;
  db.collection('gems').find().toArray(function(err, gems){
    if(err){
      console.log(err);
      res.send('An error has occured');
    }else{
      res.json(gems);
    };
  });
});

router.get('/minerals', function(req, res) {
  var db = req.db;
  db.collection('minerals').find().toArray(function(err, items){
    if(err){
      console.log(err);
      res.send('An error has occured');
    }else{
      res.json(items);
    };
  });
});


module.exports = router;
