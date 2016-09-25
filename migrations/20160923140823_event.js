
exports.up = function(knex, Promise) {
    return knex.schema.createTable('event', function(table) {
        table.increments();
        table.string('title')
        table.integer('activity_id').references('id').inTable('activity').onDelete('CASCADE');
        table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.string('description');
        table.string('location');
        table.dateTime('when');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('event');
};
