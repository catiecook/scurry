var knex = require('./knex');


function Events(){
  return knex('event');
}

function Activities(){
  return knex('activity');
}

function Users(){
  reutrn knex('users');
}





module.exports = {
  getAllEvents: Events,
  getAllActivites: Activities,
  getAllUsers: Users,
  getActivitesByName: function(name){
    return Activities().where('activity_name', name);
  },
}
