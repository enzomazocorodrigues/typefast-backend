
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('types').del()
    .then(function () {
      // Inserts seed entries
      return knex('types').insert([
        { id: 1, name: "idEvento", altName: "evento" },
    ]);
  });
};
