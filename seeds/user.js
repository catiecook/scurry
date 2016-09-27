
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({name: 'Rick Peters',
                            facebook_id: 'Ricpet',
                            picture: 'password'}),
        knex('users').insert({name: 'Anu Shrestha',
                             facebook_id: 'Anudle',
                             picture: 'password1'}),
        knex('users').insert({name: 'Grey Delamar',
                             facebook_id: 'GrapeD',
                             picture: 'password2'}),
        knex('users').insert({name: 'Catie Cook',
                             facebook_id: 'Cptcook',
                             picture: 'password3'}),
      ]);
    });
};
