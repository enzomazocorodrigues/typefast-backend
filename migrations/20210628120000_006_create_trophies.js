exports.up = function (knex, Promise) {
  return knex.schema.createTable('trophies', table => {
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
  return knex.schema.dropTable('trophies')
};

// truncate table "trophies" restart identity;
// select * from "trophies" order by id asc;