exports.up = function (knex, Promise) {
  return knex.schema.createTable('types', table => {
    table.increments('id').primary().notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.string('nome', 40).notNull().unique()
    table.string('nomeAlt', 40).notNull()
    table.text('observacoes')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('types')
};

// truncate table "types";
// select * from "types" order by id asc;