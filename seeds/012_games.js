
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {
          id: "23ced3d5-b550-41e5-afe1-56ad9537c448",
          idEstado: 12,
          idUsuario: "1b39de32-10a1-45a5-ac4c-c9e9714b32fd",
          nome: "Trava linguas",
          createdAt: new Date()
        }
      ]);
    });
};
