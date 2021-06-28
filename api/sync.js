const { v4: uuid } = require('uuid')

module.exports = app => {
  const syncObject = async (id, obj, idTabela) => {
    const { nome: tabela, chave } = await app.db('tables')
      .select('nome', 'chave')
      .where({ id: idTabela })
      .andWhere('idStatus', '>', 0)
      .first();

    if (id) {
        const { idEstado } = await app.db(tabela)
				.select('idEstado')
        .where({ id })
        .first();

      if (obj) {
        // ALTERAÇÃO
        if (obj.idEstado > 0) {
          await app.db(tabela)
            .update(obj)
            .where({ id })
            .then()
            .catch(err => {
              console.log(err)
            });

						return id
        };
      } else {
        if (idEstado > 0) {
          // DELEÇÃO
          await app.db(tabela)
            .update({ idEstado: 0 })
            .where({ id })
            .then();
        } else {
          // RECUPERAÇÃO
          const { idEstadoPara } = await app.db({ a: 'tabelas' })
            .leftOuterJoin({ b: 'statusGroups_transitions' }, 'a.idGrupoEstados', 'b.idParent')
            .select('b.idEstadoPara')
            .where('a.id', idTabela)
            .andWhere('b.idEstadoDe', 0)
            .andWhere('b.idEstadoPara', '!=', 0)
            .first();

          await app.db(tabela)
            .update({ idEstado: idEstadoPara })
            .where({ id })
            .then();

						return id
        };
      };
    } else {
      // INCLUSÃO
      obj.id = uuid()

      await app.db(tabela)
        .insert(obj)
        .returning('id')

			return obj.id
    }
  };

  const syncChildObject = async (id, obj, idTabela) => {
    const { nome: tabela, chave } = await app.db('tables')
      .select('nome', 'chave')
      .where({ id: idTabela })
      .andWhere('idEstado', '>', 0)
      .first();

    if (obj) {
      obj[chave] = id;

      if (obj.id) {
        if (!obj.del) {
          // ALTERAÇÃO
          app.db(tabela)
            .update(obj)
            .where({ id: obj.id })
            .then();
        } else {
          // DELEÇÃO
          app.db(tabela)
            .where({ id: obj.id })
            .del()
            .then();
        };
      } else {
        if (!obj.del) {
          // INCLUSÃO
          obj.id = uuid()
          await app.db(tabela)
            .insert(obj)
            .then();
        };
      };
    };
  };

  return { syncObject, syncChildObject };
};
