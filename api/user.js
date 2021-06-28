const { validate } = require('uuid')

module.exports = app => {
  const { syncObject, syncChildObject } = app.api.sync;
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  /// GET
	const get = (req, res) => {
		const search = req.params.search == "*" ? "" : req.params.search;
		const id = validate(search) ? search : null

		app.db('users')
			.where(function () {
				!search || this.where('nome', search)
					.orWhere('email', search)
					.orWhere('id', id);
			})
			.andWhere('susp', false)
			.orderBy('nome', 'asc')
			.then(users => {
				res.status(200).json([...users])
			})
			.then(err => res.status(400).send(err))
	}

  /// GETBYID
	const fnGetById = async id => {
		try {
			existsOrError(validate(id), 'ID inválido')

			const user = await app.db('users')
			.where({ id })
			.first()

			return { ...user }
		} catch(err) {
			return err
		}
	}

  const fnSave = async user => {
    try {
			existsOrError(user.idEstado, 'Estado não informado.')
			existsOrError(user.nome, 'Nome não informado.')
			existsOrError(user.email, 'Email não informado.')

			const registeredEmail = await app.db('users')
				.where({ email: user.email, nome: user.nome })
				.andWhere(function () {
					!user.id || this.andWhere('id', '!=', user.id)
				})
				.first()

			user.id = await syncObject(user.id, user, 7)

			notExistsOrError(registeredEmail, 'Email já cadastrado.')

			user = await fnGetById(user.id)
      
			return user
    } catch(err) {
      throw err
    }
  }

	const getById = async (req, res) => {
		const id = req.params.id
		try {
			const user = await fnGetById(id)
			res.status(200).json(user)
		} catch(err) {
			res.status(500).send(err)
		}
	}

	const save = async (req, res) => {
		const user = { ...req.body }
		try {
			const ret = await fnSave(user)
			res.status(200).send(ret)
		} catch(err) {
			console.log(err)
			res.status(500).send(err)
		}
	}

	/// REMOVE
	const remove = async (req, res) => {
		const id = req.params.id

		try {
			const { idEstado } = await app.db('users')
			.select('idEstado')
			.where({ id })
			.first()

			equalsOrError(idEstado == 1 ? 0 : idEstado, 0, 'Usuário não pode ser deletada.')

			await syncObject(id, null, 6)

			const { idEstado: idEstadoNovo } = await app.db('users')
				.select('idEstado')
				.where({ id })
				.first()

			res.status(200).send(idEstadoNovo)
		} catch(err) {
			res.status(400).send(err)
		}
  }

  return { fnGetById, fnSave, get, getById, save, remove }
}