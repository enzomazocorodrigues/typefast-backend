exports.up = function (knex, Promise) {
  return knex.schema.createTable('types_items', table => {
    table.increments('id').primary().notNull()
    table.integer('idPai').references('id').inTable('types').notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.string('nome', 80).notNull()
    table.string('nomeAlt', 40)
    table.integer('ordem').notNull()
    table.boolean('default').defaultTo(false).notNull()
    table.string('filtro', 40)
    table.text('observacoes')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('types_items')
};

// truncate table "types_items";
// select * from "types_items" order by id asc;