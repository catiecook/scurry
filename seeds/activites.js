
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('activity').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('activity').insert({activity_name: 'hiking'}),
        knex('activity').insert({activity_name: 'snow'}),
        knex('activity').insert({activity_name: 'running'}),
        knex('activity').insert({activity_name: 'biking'}),
      ]);
    });
};
