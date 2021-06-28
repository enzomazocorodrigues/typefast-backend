const config = require('../knexfile.js');
const knex = require('knex')(config);

/// KNEX
module.exports = knex;