
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({name: 'Rick Peters',
                            user_name: 'Ricpet',
                            password: 'password',
                            zip: 80220 }),
        knex('users').insert({name: 'Anu Shrestha',
                             user_name: 'Anudle',
                             password: 'password1',
                             zip: 80227 }),
        knex('users').insert({name: 'Grey Delamar',
                             user_name: 'GrapeD',
                             password: 'password2',
                             zip: 80226 }),
        knex('users').insert({name: 'Catie Cook',
                             user_name: 'Cptcook',
                             password: 'password3',
                             zip: 80123 }),
      ]);
    });
};
