exports.up = function (knex, Promise) {
  return knex.schema.createTable('games', table => {
    table.uuid('id').primary().notNull()
    table.integer('idEstado').references('id')
      .inTable('status').notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.uuid('idUsuario').references('id')
      .inTable('users')
    table.string('nome', 40).notNull()
    table.datetime('createdAt').notNull()
    table.text('observacoes')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('games')
};

// truncate table "games" restart identity;
// select * from "games" order by id asc;