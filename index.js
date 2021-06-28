const app = require('express')()
const consign = require('consign');
const db = require('./config/db')

app.db = db

consign()
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./api/validation.js')
  .then('./api/sync.js')
  .then('./api/user.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app);

const PORT = 3000
const HOST = '0.0.0.0'

app.listen(PORT, HOST, () => console.log(`Server listening on port ${PORT}`))