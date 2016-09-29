exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('facebook_id');
        table.text('picture');
        table.string('name');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
