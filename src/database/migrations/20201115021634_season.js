
exports.up = function(knex) {
    return knex.schema.createTable('season', function ( table ) {
        table.increments();
        
        table.decimal('season').notNullable();
        table.foreign('season').references('season_number').inTable('episodes');

        table.string('nome').notNullable();
        table.string('overview').notNullable();
        
        table.string('backdrop_path').notNullable();
        table.string('poster_path').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('season');
};
 