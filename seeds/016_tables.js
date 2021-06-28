
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('tables').del()
      .then(function () {
        // Inserts seed entries
        return knex('tables').insert([
          { id: 1, idEstado: 2, nome: "status", alias: "sta", ordem: 1, idGrupoEstados: null, descricao: null, },
          { id: 2, idEstado: 2, nome: "types", alias: "typ", ordem: 1, idGrupoEstados: 1, descricao: null, },
          { id: 3, idEstado: 2, nome: "types_items", alias: "typ_ite", ordem: 2, idGrupoEstados: 1, descricao: null, chave: "idPai" },
          { id: 4, idEstado: 2, nome: "statusGroups", alias: "sgs", ordem: 1, idGrupoEstados: 1, descricao: null, },
          { id: 5, idEstado: 2, nome: "statusGroups_transitions", alias: "sgs_tran", ordem: 2, idGrupoEstados: null, descricao: null, chave: "idPai" },
          { id: 6, idEstado: 2, nome: "trophies", alias: "tro", ordem: 1, idGrupoEstados: 2, descricao: null, },
          { id: 7, idEstado: 2, nome: "users", alias: "use", ordem: 1, idGrupoEstados: 2, descricao: null, },
          { id: 8, idEstado: 2, nome: "users_passwords", alias: "peo_pas", ordem: 2, idGrupoEstados: null, descricao: null, chave: "idPai" },
          { id: 9, idEstado: 2, nome: "users_requests", alias: "use_req", ordem: 3, idGrupoEstados: null, descricao: null, chave: "idPai" },
          { id: 10, idEstado: 2, nome: "users_trophies", alias: "use_tro", ordem: 4, idGrupoEstados: null, descricao: null, chave: "idPai" },
          { id: 11, idEstado: 2, nome: "logins", alias: "logn", ordem: 1, idGrupoEstados: null, descricao: null },
          { id: 12, idEstado: 2, nome: "games", alias: "gam", ordem: 1, idGrupoEstados: null, descricao: null, chave: "idPai" },
          { id: 13, idEstado: 2, nome: "games_phrases", alias: "gam_phr", ordem: 2, idGrupoEstados: null, descricao: null, chave: "idPai" },
          { id: 14, idEstado: 2, nome: "games_requests", alias: "gam_req", ordem: 3, idGrupoEstados: null, descricao: null, chave: "idPai" },
          { id: 15, idEstado: 2, nome: "games_rankings", alias: "gam_ran", ordem: 4, idGrupoEstados: null, descricao: null },
          { id: 16, idEstado: 2, nome: "tables", alias: "tabs", ordem: 1, idGrupoEstados: null, descricao: null },
        ]);
      });
  };
  