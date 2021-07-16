const { validate } = require('uuid')

module.exports = app => {
  const { syncObject, syncChildObject } = app.api.sync;
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  /// GET
	const fnGet = async (idPai, idUsuario) => {
		try {
			existsOrError(validate(idPai), 'ID inválido')
			existsOrError(validate(idUsuario), 'ID inválido')
		} catch (err) {
			res.status(400).send(err)
		}

		const game_ranking = await app.db({ _tab: 'games' })
			.innerJoin({ gam_ran: 'games_ranking' }, '_tab.id', 'gam_ran.idPai')
			.innerJoin({ use: 'users' }, 'gam_ran.idUsuario', 'use.id')
			.select('_tab.*', 'use.nome as nomeUsuario')
			.rank('classificacao', 'gam_ran.tempo', 'gam_ran.pontos')
			.where('gam_ran.idPai', idPai)
			.orderBy('clasificacao')
			.limit(10)
			.catch(err => res.status(400).send(err))

		res.status(200).json(game_ranking)
	}

	const getById = async (req, res) => {
		const idPai = req.params.idPai
		const idUsuario = req.params.idPai

		try {
			const game_ranking = fnGet(idPai, idUsuario)
			res.status(200).json(game_ranking)
		} catch (err) {
			res.status(400).send(err)
		}

	}

	const save = async (req, res) => {
		const game_ranking = { ...req.body }

		try {
			existsOrError(validate(idPai), 'Game inválido')
			existsOrError(validate(idUsuario), 'Usuário inválido')
		} catch (err) {
			res.status(400).send(err)
		}
		
		game_ranking.game_ranking.id = await syncChildObject(game_ranking.game_ranking.idPai, game_ranking.game_ranking, 15)

		const ret = fnGet(game_ranking.game_ranking.idPai, game_ranking.metatdata.idUsuario)

		res.status(200).json(ret)
	}

  return { getById, save }
}