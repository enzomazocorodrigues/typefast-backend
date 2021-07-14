module.exports = app => {
	app.route('/signin')
		.post(app.api.auth.signin)

	app.route('/signup')
		.post(app.api.auth.signup)

	app.route('/users')
		.all(app.config.passport.authenticate())
		.post(app.api.user.save)

	app.route('/users/:search/:idFilter')
		.get(app.api.user.get)

	app.route('/users/:id')
		.get(app.api.user.getById)
		.all(app.config.passport.authenticate())
		.delete(app.api.user.remove)

	app.route('/games/autocomplete/:search')
		.get(app.api.game.autocomplete)

	app.route('/games/:id/:idFilter')
		.get(app.api.game.get)

	app.route('/games/:id')
		.get(app.api.game.getById)
}