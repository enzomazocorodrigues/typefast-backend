exports.up = function (knex, Promise) {
  return knex.schema.createTable('statusGroups_transitions', table => {
    table.increments('id').primary().notNull()
    table.integer('idPai').references('id').inTable('statusGroups').notNull()
    table.integer('ordem').notNull()
    table.integer('idStatusDe').references('id').inTable('status').notNull()
    table.integer('idStatusPara').references('id').inTable('status').notNull()
    table.boolean('default').defaultTo(false).notNull()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('statusGroups_transitions')
};

// truncate table "statusGroups_transitions" restart identity;
// select * from "statusGroups_transitions" order by id asc;