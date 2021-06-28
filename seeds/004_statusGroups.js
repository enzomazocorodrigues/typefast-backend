
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('statusGroups').del()
    .then(function () {
      // Inserts seed entries
      return knex('statusGroups').insert([
        { id: 1, nome: "sgDefault" },
        { id: 2, nome: "sgGame" },
      ]);
    });
};
