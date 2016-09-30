var express = require('express');
var router = express.Router();
var query = require('../database/query');
var knex = require('../database/knex');
require('dotenv').config();
var api = process.env.weatherAPI;

//*********************
// ******* GETS *******

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Scurry'
    });
});

router.get('/register', function(req, res, next) {
    res.render('register', {
        title: 'Scurry'
    });
});

router.get('/create-profile', function(req, res, next) {
    res.render('create-profile', {
        title: 'Scurry'
    });
});

router.get('/dashboard', function(req, res, next) {

  if (!req.isAuthenticated()) {
    res.redirect('/');
    return;
  }
  query.upcomingEventsByUsers(req.user.id)
    .then(function(data){
      query.upcomingEventsByJoiner(req.user.id)
      .then(function(joinData){
        res.render('dashboard', {
          title: 'Scurry',
          events: data,
          user: req.user.name,
          join: joinData,
          key: process.env.weatherAPI,
          photo: req.user.picture

          
        })
      })

    })
})


router.get('/find-activity', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/');
    return;
  }
  query.getAllActivites()
    .then(function(data) {
      res.render('find-activity', {
         title: 'Scurry',
          activity: data,
          user_id: req.user.id
        });
      })
      .catch(function(err) {
         return next(err);
      })
});

router.get('/create-activity', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }
    query.getAllActivites()
        .then(function(data) {
            res.render('create-activity', {
                title: 'Scurry',
                activity: data,
                user_id: req.user.id
            });
        })
        .catch(function(err) {
            return next(err);
        })
});

//initial scurry-activity page intil a yes or no choice is made
router.get('/scurry-activity/find/', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/');
    return;
  }
  query.getEventIDsByActivityID(req.query.id)
  .then(function(data){
    res.render('scurry-activity', {
      events: data,
      title: "Scurry"
    });
  })
});

//when no/yes button is chosen the first time, it will route to this
router.get('/scurry-activity/:id', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }
    query.getEventInfoByID(req.params.id)
        .then(function(data) {
            var eventData = data[0]
            if (req.user.id == eventData.admin_id) {
                res.render('activity', {
                    id: eventData.id,
                    title: eventData.title,
                    city: eventData.city,
                    state: eventData.state,
                    address: eventData.address,
                    description: eventData.description,
                    when: eventData.when.toDateString(),
                    admin: true, //made this false if not admin id below
                    googleAPI: process.env.googleAPI,
                    noob: false
                })
            } else {
                res.render('activity', {
                    id: eventData.id,
                    title: eventData.title,
                    city: eventData.city,
                    state: eventData.state,
                    address: eventData.address,
                    description: eventData.description,
                    when: eventData.when.toDateString(),
                    admin: false,
                    noob: true
                })
            };
      });
})

router.get('/delete-activity/:id', function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/');
            return;
        }
        query.getEventInfoByID(req.params.id)
            .then(function(data) {
                var eventData = data[0]
                if (req.user.id == eventData.admin_id) {
                    res.render('delete-activity', {
                        title: eventData.title,
                        id: eventData.id
                    })
                } else {
                    res.redirect('/scurry-activity')
                }
            });
    });
router.get('/:id/delete', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }
    query.deleteEvent(req.params.id)
        .then(function() {
            res.redirect('/dashboard')
        })
});

router.get('/edit-activity/:id', function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/');
            return;
        }
        query.getEventInfoByID(req.params.id)
            .then(function(data) {
                var eventData = data[0]
                if (req.user.id == eventData.admin_id) {
                    res.render('edit-activity', {
                        title: eventData.title,
                        id: req.params.id,
                        when: eventData.when,
                        description: eventData.description,
                        city: eventData.city,
                        state: eventData.state,
                        address: eventData.address,
                    })
                } else {
                    res.redirect('/scurry-activity')
                }
            });
    });

router.get('/:id/scurry-activity', function(req, res, next){
      if(!req.isAuthenticated()){
        res.redirected('/');
        return;
      }
      query.getEventInfoByID(req.params.id)
      .then(function(eventData){
        var event_title = eventData[0].title;
        var event_when = eventData[0].when.toDateString();
        var event_id = req.params.id;
        var user_id = req.user.id;
        query.addUsertoEvent(event_id, user_id, event_title, event_when)
        .then(function(data){
          res.redirect('/dashboard')
        })
      })
    })

//*********************
// ***** POSTS ********

router.post('/login', function(req, res, next) {
    res.redirect('/dashboard')
})

router.post('/resgister', function(req, res, next) {
    res.redirect('/create-profile')
})

router.post('/create-profile', function(req, res, next) {
    res.redirect('/dashboard')
})

router.post('/create-activity', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    var admin_id = req.user.id;
    var activity_id = req.body.activity_id;
    var title = req.body.title;
    var when = req.body.when;
    var city = req.body.city;
    var state = req.body.state;
    var address = req.body.address;
    var description = req.body.description;
    query.addEvent(admin_id, activity_id, title, when, city, state, address, description)
        .then(function(data) {
            res.redirect('/dashboard')
        })
        .catch(function(err) {
            return next(err);
        })
})
router.post('/scurry-activity', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }
    res.redirect('/scurry-activity/' + req.body.activity_name)
})

router.post('/edit-activity/:id', function(req, res, next) {
  if (!req.isAuthenticated()) {
      res.redirect('/');
      return;
  }
  var id = req.params.id;
  var title = req.body.title;
  var when = req.body.when;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var description = req.body.description;
  query.updateEvent(id, title, when, city, state, address, description )
    .then(function(data) {
        res.redirect('/dashboard');
    })
  })



router.post('/scurry-activity', function(req, res, next){
  if (!req.isAuthenticated()) {
    res.redirect('/');
    return;
  }
  res.redirect('/scurry-activity/' + req.body.activity_name)
})

module.exports = router;
