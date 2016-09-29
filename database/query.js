var knex = require('./knex');


function Events() {
    return knex('event');
}

function Activities() {
    return knex('activity');
}

function Users() {
    return knex('users');
}

function EventUser(){
  return knex('event_user')
}


module.exports = {
    getAllEvents: Events,
    getAllActivites: Activities,
    // getAllUsers: Users,

    getActivitesByName: function(name) {
        return
        Activities().where('activity_name', name);
    },

    addEvent: function(admin_id, activity_id, title, when, address, city, state, description) {
        return Events().insert({
            'admin_id': admin_id,
            'activity_id': activity_id,
            'title': title,
            'when': when,
            'address':address,
            'state': state,
            'city': city,
            'description': description
        })
    },

    // getEventByUsers: function(user) {
    //     return Events().where('users_id', user);
    // },

    upcomingEventsByUsers: function(id) {
       return Events().where('admin_id', id)
   },

    getEventByLocation: function(location) {
        return Events().where('location', location);
    },

    getEventByTime: function(time) {
        return Events().where('when', time);
    },

    deleteEvent: function(id) {
        return Events().where('id', id).del();
    },

    getEventInfoByID: function(id) {
      return Events().where('id', id);
    },

    getEventByActivity: function(name) {
      return Events().where('activity_name', name);
    },

    getEventIDsByActivityID: function(id) {
      return Events().where('id', id)
    },

    updateEvent: function(id, title, when, address, city, state, description){
      return Events().where('id', id).update({
        'title': title,
        'when': when,
        'address': address,
        'state': state,
        'city': city,
        'description': description
      });
    },

    addUsertoEvent: function(event_id, users_id){
   return EventUser().insert({
     'event_id': event_id,
     'users_id': users_id,
   })
 }
}
