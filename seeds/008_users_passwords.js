const bcryptjs = require('bcryptjs')

const encryptPassword = password => {
  const salt = bcryptjs.genSaltSync(10)
  return bcryptjs.hashSync(password, salt)
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_passwords').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_passwords').insert({
        id: 1,
        idParent: "bf7bafe3-5059-4a96-89b2-bc405ea7cd12",
        date: new Date().toISOString(),
        password: encryptPassword("enzo1234")
      });
    });
};
