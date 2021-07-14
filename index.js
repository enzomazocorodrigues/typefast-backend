const app = require('express')()
const consign = require('consign');
const db = require('./config/db')
app.db = db

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", ['http://localhost:8080', 'https://typefast-v1.vercel.app']); 
  res.header("Access-Control-Allow-Origin", '*'); // deletar
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

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