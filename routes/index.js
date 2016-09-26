var express = require('express');
var router = express.Router();
var query = require('../database/query');

//*********************
// ******* GETS **********

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Scurry' });
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'Scurry' });
});


router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Scurry' });
});

router.get('/create-profile', function(req, res, next) {
  res.render('create-profile', {
    title: 'Scurry' });
});

router.get('/find-activity', function(req, res, next) {
  res.render('find-activity', {
    title: 'Scurry' });
});

router.get('/create-activity', function(req, res, next) {
  res.render('create-activity', {
    title: 'Scurry' });
});

router.get('/scurry-activity', function(req, res, next) {
  res.render('scurry-activity', {
    title: 'Scurry' });
});

router.get('/scurry-activity/:id', function(req, res, next) {
  res.render('activity', {
    title: 'Scurry' });
});

//*********************
// ***** POSTS ********

router.post('/login', function(req, res, next){
  res.redirect('/dashboard')
})

router.post('/resgister', function(req, res, next){
  res.redirect('/create-profile')
})

router.post('/create-profile', function(req, res, next){
  res.redirect('/dashboard')
})

router.post('/create-activity', function(req, res, next){
  res.redirect('/dashboard')
})

router.post('/create-activity', function(req, res, next){
  res.redirect('/dashboard')
})

router.post('/scurry-activity', function(req, res, next){
  res.redirect('/scurry-activity')
})

router.post('/scurry-activity/:id', function(req, res, next){
  res.redirect('/activity')
})


module.exports = router;
