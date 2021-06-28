
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('statusGroups_transitions').del()
    .then(function () {
      // Inserts seed entries
      return knex('statusGroups_transitions').insert([
        { idParent: 1, order: 1, idStatusFrom: 0, idStatusTo: 1, default: true },
        { idParent: 1, order: 2, idStatusFrom: 1, idStatusTo: 0, default: false },
        { idParent: 1, order: 3, idStatusFrom: 1, idStatusTo: 2, default: true },
        { idParent: 1, order: 4, idStatusFrom: 2, idStatusTo: 3, default: true },
        { idParent: 1, order: 5, idStatusFrom: 3, idStatusTo: 2, default: true },
        { idParent: 2, order: 1, idStatusFrom: 11, idStatusTo: 12, default: true },
        { idParent: 2, order: 2, idStatusFrom: 12, idStatusTo: 11, default: false },
        { idParent: 2, order: 3, idStatusFrom: 12, idStatusTo: 3, default: true },
        { idParent: 2, order: 4, idStatusFrom: 3, idStatusTo: 12, default: true },
      ]);
    });
};
