
exports.up = function(knex) {
    return knex.schema.createTable('episodes', function ( table ) {
        table.increments();
        
        table.decimal('season_number').notNullable();

        table.string('title').notNullable();
        table.string('original_title').notNullable();

        table.string('overview').notNullable();

        table.string('backdrop_path').notNullable();
        table.string('poster_path').notNullable();
        
        table.decimal('release_date').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('episodes');
};
 