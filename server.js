const fs = require('fs');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');
const userdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));

server.use(middlewares);
server.use(jsonServer.bodyParser);
const SECRET_KEY = '123456789';
const expiresIn = '8h';

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  let resp = jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err));
  return resp;
}

// Check if the user exists in database
function isAuthenticated(numeroEmpleado) {
  return userdb.users.findIndex((user) => user.numeroempleado === numeroEmpleado) !== -1;
}

server.post('/auth/login', (req, res) => {
  const { numeroEmpleado } = req.body;
  if (isAuthenticated(numeroEmpleado) === false) {
    const status = 401;
    const respuesta = {
      meta: { status: 'ERROR', count: 1 },
      data: {
        errorCode: 404,
        userMessage: 'Usuario Invalido',
        devMessage: 'usuario no existe',
      },
    };
    res.status(status).json(respuesta);
    return;
  }
  const access_token = createToken({ numeroEmpleado });
  let usuario = null;
  userdb.users.findIndex((user) => (usuario = user));
  res.status(200).json({ meta: {}, data: { usuario, access_token } });
});

server.get('/centros/pdf', (req, res) => {
  fs.readFile('src/assets/pdf/sample.pdf', (error, data) => {
    if (error) {
      res.json({ status: 'error', msg: error });
    } else {
      res.writeHead(200, { 'Content-Type': 'application/pdf' });
      res.write(data);
      res.end();
    }
  });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined) {
    const status = 401;
    const message = 'Error in authorization format';
    res.status(status).json({ status, message });
    return;
  }
  let verifyTokenResult;
  try {
    verifyTokenResult = verifyToken(req.headers.authorization);
    if (verifyTokenResult instanceof Error) {
      throw verifyTokenResult;
    }
    next();
  } catch (err) {
    const status = 401;
    const respuesta = {
      meta: { status: 'ERROR', count: 1 },
      data: {
        errorCode: 401,
        userMessage: 'No tienes acceso al recurso (Error access_token)',
        devMessage: 'Error access_token is revoked',
      },
    };
    res.status(status).json(respuesta);
  }
});

server.use(router);
const args = require('minimist')(process.argv.slice(2));
const port = !args['port'] ? 3200 : args['port'];
const host = !args['host'] ? '0.0.0.0' : args['host'];

server.listen(port, host, () => {
  console.log(`JSON Server is running ${host} on port ${port}`);
});
