exports.up = function (knex, Promise) {
  return knex.schema.createTable('games_phrases', table => {
    table.increments('id').primary().notNull()
    table.uuid('idPai').references('id')
      .inTable('games').notNull()
    table.datetime('data').notNull()
    table.integer('idDesafiador').references('id')
      .inTable('users').notNull()
    table.integer('idDesafiado').references('id')
      .inTable('users').notNull()
    table.datetime('dataResposta')
    table.boolean('aceito')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('games_phrases')
};

// truncate table "games_phrases" restart identity;
// select * from "games_phrases" order by id asc;