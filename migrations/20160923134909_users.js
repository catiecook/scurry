exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('name');
        table.string('user_name');
        table.string('password');
        table.integer('zip');
        table.string('email');
        table.string('pic_url');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
