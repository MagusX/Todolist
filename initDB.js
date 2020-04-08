const Pass = require('./models/password');
const conf = require('./config');

module.exports = {
  initPass: function() {
    Pass.create({
      password: conf.password
    })
    .then(console.log('Initialized Pass successfully'))
    .catch(err => console.log(err));
  }
}