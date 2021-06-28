const { v4: uuid } = require('uuid')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('status').del()
    .then(function () {
      // Inserts seed entries
      return knex('status').insert([
        { id: 0, susp: false, nome: 'deletado', action: 'deletar' },
        { id: 1, susp: false, nome: 'cadastro', action: 'cadastrar' },
        { id: 2, susp: false, nome: 'ativo', action: 'ativar' },
        { id: 3, susp: false, nome: 'desativo', action: 'desativar' },
        { id: 11, susp: false, nome: 'em análise', action: 'analisar' },
        { id: 12, susp: false, nome: 'disponível', action: 'disponibilizar' },
      ]);
    });
};
