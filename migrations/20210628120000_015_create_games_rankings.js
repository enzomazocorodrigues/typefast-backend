exports.up = function (knex, Promise) {
  return knex.schema.createTable('games_rankings', table => {
    table.increments('id').primary().notNull()
    table.uuid('idPai').references('id')
      .inTable('games').notNull()
    table.text('idSession') //? revisar
    table.datetime('data').notNull()
    table.time('tempo').notNull()
    table.integer('pontos').notNull()
    table.decimal('avaliacao', 2, 1)
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('games_  rankings')
};

// truncate table "games_rankings" restart identity;
// select * from "games_rankings" order by id asc;