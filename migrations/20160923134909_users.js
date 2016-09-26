exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('facebook_id');
        table.string('picture');
        table.string('name');
        // table.string('token');
        // table.integer('event_id').references('id').inTable('event')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
