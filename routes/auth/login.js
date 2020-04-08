const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const conf = require('../../config');
const Pass = require('../../models/password');
const withAuth = require('../../middleware');

router.get('/login', (req, res) => {
  res.send('Login');
});

router.get('/checkToken', withAuth, (req, res) => {
  res.send('Good').status(200);
});

router.post('/login', (req, res) => {
  Pass.findOne({})
  .then(pass => {
    if (pass.isPasswordMatched(req.body.password)) {
      const payload = {pl: 'pl'};
      const token = jwt.sign(payload, conf.secret, {
        expiresIn: '1h'
      });
      res.cookie('token', token).sendStatus(200);
    } else res.status(401).json({error: 'Incorrect password'});
  })
  .catch(err => console.log(err));
});

module.exports = router;