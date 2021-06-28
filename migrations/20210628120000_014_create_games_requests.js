exports.up = function (knex, Promise) {
  return knex.schema.createTable('games_requests', table => {
    table.increments('id').primary().notNull()
    table.uuid('idPai').references('id')
      .inTable('games').notNull()
    table.datetime('data').notNull()
    table.uuid('idDesafiador').references('id')
      .inTable('users').notNull()
    table.uuid('idDesafiado').references('id')
      .inTable('users').notNull()
    table.datetime('dataResposta')
    table.boolean('aceito')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('games_requests')
};

// truncate table "games_requests" restart identity;
// select * from "games_requests" order by id asc;