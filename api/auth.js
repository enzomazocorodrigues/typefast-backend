const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcryptjs = require('bcryptjs')
const { v4: uuid } = require('uuid');

module.exports = app => {
  const { existsOrError, equalsOrError, notExistsOrError } = app.api.validation;
  const { fnGetById: fnUserGetById, fnSave: fnUserSave } = app.api.user;

  /// ENCRYPTPASSWORD
  const encryptPassword = password => {
    const salt = bcryptjs.genSaltSync(10)
    return bcryptjs.hashSync(password, salt)
  }

  /// SIGNUP
  const signup = async (req, res) => {
    const signUp = { ...req.body }
    try {
      existsOrError(signUp.nome, 'Nome não informado.')
      existsOrError(signUp.email, 'E-mail não informado.')
      existsOrError(signUp.senha, 'Senha não infromada.')
      existsOrError(signUp.confirmarSenha, 'Confirmação de senha não informada.')
      equalsOrError(signUp.senha, signUp.confirmarSenha, 'Senhas não conferem.')

      delete signUp.confirmarSenha

      signUp.senha = encryptPassword(signUp.password)
      
      const user = {
        idEstado: 1,
        nome: signUp.nome,
        email: signUp.email,
        passwords: [{ date: new Date().toISOString().substring(0, 10), password: signUp.password }]
      }

      await fnUserSave(user)
      
      res.status(200).send()
    } catch(err) {
      res.status(400).send(err)
    }
  }

  /// SIGNIN
  const signin = async (req, res) => {
    const signIn = { ...req.body }
    try {
      existsOrError(signIn.email, 'E-mail não informado.')
      existsOrError(signIn.senha, 'Senha não infromada.')
      
      const existentUser = await app.db('users')
        .select('id')
        .where({ email: signIn.email })
        .first()

      existsOrError(existentUser, 'E-mail ou senha inválidos.')

      existentUser.senha = await app.db('users_passwords')
      .select('senha')
      .where({ idPai: existentUser.id })
      .first()
      .then(senha => senha.senha)

      const match = await bcryptjs.compare(signIn.senha, existentUser.senha)
      existsOrError(match, 'E-mail ou senha inválidos.')
      console.log(match)
      
      const user = await fnUserGetById(existentUser.id)
      console.log(user)

      const now = Math.floor(Date.now() / 1000)
      const metadata = {
        iat: now,
        reiat: now,
        exp: now + (60 * 60 * 24 * 7)
      }

      const payload = { 
        metadata,
        user
      }

      payload.metadata.token = jwt.encode(payload, authSecret)

      res.status(200).json({ ...payload })
    } catch(err) {
      res.status(400).send(err)
    }
  }

  return { signin, signup }
}
