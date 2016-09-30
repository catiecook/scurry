
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('activity').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('activity').insert({activity_name: 'Hiking'}),
        knex('activity').insert({activity_name: 'Snowboard/Ski'}),
        knex('activity').insert({activity_name: 'Running'}),
        knex('activity').insert({activity_name: 'Biking'}),
      ]);
    });
};
