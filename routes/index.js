var express = require('express');
var router = express.Router();
var query = require('../database/query');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  query.getAllEvents()
  .then(function(data){
    res.send(data);
  })
  .catch(function(err){
    return next(err);
  })
})

module.exports = router;
