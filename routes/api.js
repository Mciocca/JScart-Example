var express = require('express');
var router = express.Router();

router.get('/gems', function(req, res) {
  var db = req.db;
  db.collection('gems').find().toArray(function(err, gems){
    if(err){
      console.log(err);
      res.status(500).send('An error has occured');
    }else{
      res.json(gems);
    };
  });
});

router.get('/minerals', function(req, res) {
  var db = req.db;
  db.collection('minerals').find().toArray(function(err, minerals){
    if(err){
      console.log(err);
      res.status(500).send('An error has occured');
    }else{
      res.json(minerals);
    };
  });
});

module.exports = router;
