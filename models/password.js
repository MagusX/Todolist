const mongoose = require('mongoose');

const passSchema = mongoose.Schema({
  password: String
});

passSchema.methods.isPasswordMatched = function(password) {
  return this.password === password;
}

module.exports = Pass = mongoose.model('Pass', passSchema);