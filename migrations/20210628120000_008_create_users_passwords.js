exports.up = function (knex, Promise) {
  return knex.schema.createTable('users_passwords', table => {
    table.increments('id').primary().notNull()
    table.uuid('idPai').references('id')
      .inTable('users').notNull()
    table.integer('idTipo').references('id')
      .inTable('types_items').notNull()
    table.datetime('data').notNull()
    table.string('senha').notNull()
    table.datetime('codigoVerificacao')
    table.datetime('dataCodigoVerficacao')
    table.datetime('dataVerficicao')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users_passwords')
};

// truncate table "users_passwords" restart identity;
// select * from "users_passwords" order by id asc;