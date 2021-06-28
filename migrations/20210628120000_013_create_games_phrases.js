exports.up = function (knex, Promise) {
  return knex.schema.createTable('games_phrases', table => {
    table.increments('id').primary().notNull()
    table.uuid('idPai').references('id')
      .inTable('games').notNull()
    table.text('texto').notNull()
    table.boolean('verificado').defaultTo(false).notNull()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('games_phrases')
};

// truncate table "games_phrases" restart identity;
// select * from "games_phrases" order by id asc;