module.exports = app => {
	app.route('/signin')
		.post(app.api.auth.signin)

	app.route('/signup')
		.post(app.api.auth.signup)

		
	app.route('/users')
		.all(app.config.passport.authenticate())
		.post(app.api.user.save)

	app.route('/users/:search/:idFilter')
		.all(app.config.passport.authenticate())
		.get(app.api.user.get)

	app.route('/users/:id')
		.all(app.config.passport.authenticate())
		.get(app.api.user.getById)
		.delete(app.api.user.remove)
}