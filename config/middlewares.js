const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = app => {
  app.use(bodyParser.json());
  app.use(cors());

  app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", ['http://localhost:8080', 'https://typefast-v1.vercel.app']); 
    res.header("Access-Control-Allow-Origin", '*'); // deletar
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
  });
};