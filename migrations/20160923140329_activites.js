exports.up = function(knex, Promise) {
    return knex.schema.createTable('activity', function(table) {
        table.increments();
        table.string('activity_name');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('activity');
};
