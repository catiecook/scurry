exports.up = function(knex, Promise) {
    return knex.schema.createTable('location', function(table) {
        table.increments();
        table.integer('latitude');
        table.integer('longitude');
        table.string('city');
        table.string('state');
        table.string('zip');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('location');
};
