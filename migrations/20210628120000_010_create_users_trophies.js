exports.up = function (knex, Promise) {
  return knex.schema.createTable('users_requests', table => {
    table.increments('id').primary().notNull()
    table.uuid('idPai').references('id')
      .inTable('users').notNull()
    table.integer('idUsuario').references('id')
      .inTable('users').notNull()
    table.integer('idTrofeu').references('id')
      .inTable('trophies').notNull()
    table.datetime('data')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users_requests')
};

// truncate table "users_requests" restart identity;
// select * from "users_requests" order by id asc;