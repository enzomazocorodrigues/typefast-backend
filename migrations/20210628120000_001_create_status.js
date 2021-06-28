exports.up = function (knex, Promise) {
  return knex.schema.createTable('status', table => {
    table.increments('id').primary().notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.string('nome', 25).notNull().unique()
    table.string('evento', 25).notNull()
    table.text('observacoes')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('status')
};

// truncate table "status";
// select * from "status" order by id asc;