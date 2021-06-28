exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.uuid('id').primary().notNull()
    table.integer('idEstado').references('id')
      .inTable('status').notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.string('nome', 40).notNull()
    table.string('email', 80).notNull()
    table.integer('pontos').defaultTo(0).notNull()
    table.boolean('admin').defaultTo(false).notNull()
    table.datetime('createdAt').notNull()
    table.text('observacoes')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
};

// truncate table "users" restart identity;
// select * from "users" order by id asc;