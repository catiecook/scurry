var knex = require('./knex');


function Events() {
    return knex('event');
}

function Activities() {
    return knex('activity');
}

// function Users() {
//     reutrn knex('users');
// }





module.exports = {
    getAllEvents: Events,
    getAllActivites: Activities,
    // getAllUsers: Users,

    getActivitesByName: function(name) {
        return
        Activities().where('activity_name', name);
    },

    addEvent: function(admin_id, activity_id, title, when, city, state, zip, description) {
        return Events().insert({
            admin_id: admin_id,
            activity_id: activity_id,
            title: title,
            when: when,
            state: state,
            city: city,
            zip: zip,
            description: description
        })
    },

    // getEventByUsers: function(user) {
    //     return Events().where('users_id', user);
    // },

    getEventByLocation: function(location) {
        return Events().where('location', location);
    },

    getEventByTime: function(time) {
        return Events().where('when', time);
    },

    deleteEvent: function(id) {
        return Events().where('id', id).del();
    }
}
