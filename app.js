var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();

var cookieSession = require('cookie-session')

var routes = require('./routes/index');
var users = require('./routes/users');
var KnexConfig = require('./knexfile');
var knex = require('./database/knex.js')

var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  name: 'session',
  keys: [process.env.cookie_session_key1, process.env.cookie_session_key2]
}))
console.log(process.env.callbackurl);
passport.use(new FacebookStrategy({
  clientID: process.env.fb_clientID,
  clientSecret: process.env.fb_clientSecret,
  callbackURL: process.env.callbackurl || "http://localhost:3000/auth/facebook/callback",
  profilefeilds: ['displayName', 'picture.width(200).height(200)', 'first_name', 'last_name']
},
  function(accessToken, refreshToken, profile, callback) {
    console.log(profile)
    knex('users').select('*').where({
      facebook_id: profile.id
    })
    .then(function (resp) {
      if (resp.length === 0) {
        var user = {
          facebook_id: profile.id,
          picture: "https://graph.facebook.com/" + profile.id + "/picture" + "?width=200&height=200" + "&access_token=" + accessToken,
          name: profile.displayName
        }
// set user in session
        knex('users').insert(user).then(function (resp) {
          callback(null, user)
        })
      } else {
        callback(null, resp[0])
      }
    })
  }
 ))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


app.use('/', routes);
app.use('/users', users);

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']} ))
app.get('/auth/facebook/callback',
  passport.authenticate('facebook',{successRedirect: '/dashboard',
                                    failureRedirect: '/' }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
