
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('statusGroups_transitions').del()
    .then(function () {
      // Inserts seed entries
      return knex('statusGroups_transitions').insert([
        { idPai: 1, ordem: 1, idEstadoDe: 0, idEstadoPara: 1, default: true },
        { idPai: 1, ordem: 2, idEstadoDe: 1, idEstadoPara: 0, default: false },
        { idPai: 1, ordem: 3, idEstadoDe: 1, idEstadoPara: 2, default: true },
        { idPai: 1, ordem: 4, idEstadoDe: 2, idEstadoPara: 3, default: true },
        { idPai: 1, ordem: 5, idEstadoDe: 3, idEstadoPara: 2, default: true },
        { idPai: 2, ordem: 1, idEstadoDe: 11, idEstadoPara: 12, default: true },
        { idPai: 2, ordem: 2, idEstadoDe: 12, idEstadoPara: 11, default: false },
        { idPai: 2, ordem: 3, idEstadoDe: 12, idEstadoPara: 3, default: true },
        { idPai: 2, ordem: 4, idEstadoDe: 3, idEstadoPara: 12, default: true },
      ]);
    });
};
