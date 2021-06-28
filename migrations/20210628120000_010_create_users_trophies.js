exports.up = function (knex, Promise) {
  return knex.schema.createTable('users_trophies', table => {
    table.increments('id').primary().notNull()
    table.uuid('idPai').references('id')
      .inTable('users').notNull()
    table.uuid('idTrofeu').references('id')
      .inTable('trophies').notNull()
    table.datetime('data')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users_trophies')
};

// truncate table "users_trophies" restart identity;
// select * from "users_trophies" order by id asc;