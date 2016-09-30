
exports.up = function(knex, Promise) {
  return knex.schema.createTable('event_user', function(table){
    table.increments();
    table.integer('event_id').references('id').inTable('event').onDelete('CASCADE');
    table.integer('users_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('event_title');
    table.string('event_when');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('event_user');
};
