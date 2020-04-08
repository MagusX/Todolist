const jwt = require('jsonwebtoken');
const conf = require('./config');

const withAuth = (req, res, next) => {
  const token = req.body.token ||
                req.query.token ||
                req.headers['x-access-token'] ||
                req.cookies.token;

  if (!token) {
    res.status(401).send('No token provided');
  } else {
    jwt.verify(token, conf.secret, (err, decoded) => {
      if (err) res.status(401).send('Invalid token');
      else next();
    });
  }
}

module.exports = withAuth;