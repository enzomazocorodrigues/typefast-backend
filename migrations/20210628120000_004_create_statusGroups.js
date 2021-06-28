exports.up = function (knex, Promise) {
  return knex.schema.createTable('statusGroups', table => {
    table.increments('id').primary().notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.string('nome', 25).notNull()
    table.text('observacoes')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('statusGroups')
};

// truncate table "statusGroups";
// select * from "statusGroups" order by id asc;