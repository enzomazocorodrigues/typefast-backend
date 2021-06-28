const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt;

module.exports = app => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  const strategy = new Strategy(params, (payload, done) => {
    const now = Math.floor(Date.now() / 1000)
    if (!payload.metadata || payload.metadata.exp < now) {
      done(null, false)
    } else {
      app.db('users')
        .select('id')
        .where({ id: payload.user.id })
        .first()
        .then(user => {
          done(null, user ? { ...payload } : false)
        })
        .catch(err => done(err, false))
    }
  });

  passport.use(strategy);

  return {
    authenticate: () => passport.authenticate('jwt', { session: false })
  };
};
