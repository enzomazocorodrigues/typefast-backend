exports.up = function (knex, Promise) {
  return knex.schema.createTable('games', table => {
    table.uuid('id').primary().notNull()
    table.integer('idEstado').references('id')
      .inTable('status').notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.integer('idTipo').references('id')
      .inTable('types_items').notNull()
    table.string('nome', 40).notNull()
    table.text('descricao').notNull()
    table.integer('pontos').notNull()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('games')
};

// truncate table "games" restart identity;
// select * from "games" order by id asc;