exports.up = function (knex, Promise) {
  return knex.schema.createTable('logins', table => {
    table.increments('id').primary().notNull()
    table.integer('idTipo').references('id')
      .inTable('types_items').notNull()
    table.uuid('idUsuario').references('id').inTable('users')
    table.datetime('date').notNull()
    // table.string('deviceName', 20)
    // table.string('deviceModel', 20)
    // table.string('osName', 20)
    // table.string('osVersion', 20)
    // table.string('browserName', 20)
    // table.string('browserVersion', 20)
    // table.string('ipInternal', 39)
    // table.string('ipExternal', 39)
    // table.decimal('latitude', 9, 7)
    // table.decimal('longitude', 10, 7)
    // table.string('appVersion', 20).notNull()
    table.datetime('dateLogout')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('logins')
};

// truncate table "logins" restart identity;
// select * from "logins" order by id asc;