const { validate } = require('uuid')

module.exports = app => {
  const { syncObject, syncChildObject } = app.api.sync;
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  /// GET
	const get = (req, res) => {
		const search = req.params.search == "*" ? "" : req.params.search;
		const id = validate(search) ? search : null

		app.db({ _tab: 'games' })
			.innerJoin({ gam_phr: 'games_phrases' }, 'gam_phr.idPai', '_tab.id')
			.innerJoin({ use: 'users' }, '_tab.idUsuario', 'use.id')
			.select('_tab.*', 'use.nome as usuarioNome')
			.where(function () {
				!search || this.where('_tab.nome', 'ilike', `%${search}`)
					.orWhere('gam_phr.texto', 'ilike', `%${search}`)
					.orWhere('use.nome', 'ilike', `%${search}`)
					.orWhere('id', search)
			})
			.andWhere('_tab.susp', false)
			.orderBy('_tab.nome', 'asc')
			.groupBy('_tab.id', 'use.nome')
			.then(games => {
				res.status(200).json([...games])
			})
			.then(err => res.status(400).send(err))
	}

	const getById = async (req, res) => {
		const id = req.params.id
		try {
			existsOrError(validate(id), 'ID inválido')
		} catch (err) {
			res.status(400).send(err)
		}

		const game = await app.db({ _tab: 'games' })
			.innerJoin({ use: 'users' }, '_tab.idUsuario', 'use.id')
			.select('_tab.*', 'use.nome as nomeUsuario')
			.where('_tab.id', id)
			.first()
			.catch(err => res.status(400).send(err))

		const phrases = await app.db('games_phrases')
			.where('idPai', id)
			.catch(err => res.status(400).send(err))

		const rankings = await app.db('games_rankings')
			.where('idPai', id)
			.orderBy('tempo')
			.limit(20)
			.catch(err => res.status(400).send(err))

		const result = {
			game,
			phrases,
			rankings
		}

		res.status(200).json(result)
	}

	const autocomplete = (req, res) => {
		const search = req.params.search == "*" ? "" : req.params.search;
		const id = validate(search) ? search : null 

		app.db({ _tab: 'games' })
			.innerJoin({ gam_phr: 'games_phrases' }, 'gam_phr.idPai', '_tab.id')
			.innerJoin({ use: 'users' }, '_tab.idUsuario', 'use.id')
			.select('_tab.id as value', '_tab.nome as text', 'use.nome as nomeUsuario')
			.where(function () {
				!search || this.where('_tab.nome', 'ilike', `%${search}%`)
					.orWhere('gam_phr.texto', 'ilike', `%${search}%`)
					.orWhere('use.nome', 'ilike', `%${search}%`)
					.orWhere('_tab.id', id)
			})
			.andWhere('_tab.susp', false)
			.orderBy('_tab.nome', 'asc')
			.groupBy('_tab.id', 'use.nome')
			.limit(5)
			.then(games => {
				games.unshift({ value: null, text: search, nomeUsuario: null })
				res.status(200).json([...games])
			})
			.catch(err => res.status(400).send(err))
	}

  return { get, getById, autocomplete }
}