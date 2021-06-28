const { v4: uuid } = require('uuid')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('status').del()
    .then(function () {
      // Inserts seed entries
      return knex('status').insert([
        { id: 0, susp: false, nome: 'deletado', evento: 'deletar' },
        { id: 1, susp: false, nome: 'cadastro', evento: 'cadastrar' },
        { id: 2, susp: false, nome: 'ativo', evento: 'ativar' },
        { id: 3, susp: false, nome: 'desativo', evento: 'desativar' },
        { id: 11, susp: false, nome: 'em análise', evento: 'analisar' },
        { id: 12, susp: false, nome: 'disponível', evento: 'disponibilizar' },
      ]);
    });
};
