
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', function ( table ) {
        table.string('crypto').primary()
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('description').notNullable();
        table.string('language').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuairos');
};
