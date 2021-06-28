
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: "1b39de32-10a1-45a5-ac4c-c9e9714b32fd",
          idEstado: 2,
          name: 'Type Fast',
          email: 'typefast@mail.com',
          admin: true,
          createdAt: new Date()
        },
        {
          id: 'bf7bafe3-5059-4a96-89b2-bc405ea7cd12',
          idEstado: 2,
          name: 'Enzo Mazoco Rodrigues',
          email: 'enzo.rodrigues2@gmail.com',
          admin: true,
          createdAt: new Date()
        }
      ]);
    });
};
