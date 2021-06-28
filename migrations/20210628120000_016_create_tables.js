exports.up = function (knex, Promise) {
  return knex.schema.createTable('tables', table => {
    table.increments('id').primary().notNull()
    table.integer('idEstado').references('id').inTable('status').notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.string('nome', 40).notNull()
    table.string('alias', 20).notNull()
    table.integer('ordem').notNull()
    table.integer('idGrupoEstados').references('id').inTable('statusGroups')
    table.string('descricao', 30)
    table.string('chave', 30)
    table.boolean('log').defaultTo(false).notNull()
    table.text('observacoes')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('tables')
};

// truncate table "tables";
// select * from "tables" order by id asc;