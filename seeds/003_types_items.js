
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('types_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('types_items').insert([
        { id: 0, idPai: 1, nome: "consultado", nomeAlt: "consultar", ordem: 0, default: false, filtro: null, observacoes: null },
        { id: 1, idPai: 1, nome: "incluido", nomeAlt: "incluir", ordem: 1, default: false, filtro: null, observacoes: null },
        { id: 2, idPai: 1, nome: "alterado", nomeAlt: "alterar", ordem: 2, default: false, filtro: null, observacoes: null },
        { id: 3, idPai: 1, nomeAlt: "deletar", ordem: 3, default: false, nome: "deletado", filtro: null, observacoes: null },
        { id: 4, idPai: 1, nome: "recuperado", nomeAlt: "recuperar", ordem: 4, default: false, filtro: null, observacoes: null },
      ]);
    });
};
