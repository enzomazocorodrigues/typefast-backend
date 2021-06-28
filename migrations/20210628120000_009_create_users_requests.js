exports.up = function (knex, Promise) {
  return knex.schema.createTable('users_requests', table => {
    table.uuid('id').primary().notNull()
    table.uuid('idPai').references('id')
      .inTable('users').notNull()
    table.uuid('idUsuario').references('id')
      .inTable('users').notNull()
    table.datetime('dataPedido').notNull()
    table.datetime('dataResposta')
    table.boolean('aceito')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users_requests')
};

// truncate table "users_requests" restart identity;
// select * from "users_requests" order by id asc;