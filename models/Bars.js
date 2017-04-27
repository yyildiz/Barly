const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  size: String,
  type: String,
  distance: String,
  cardMin: String,
  dollarVal: String,
  img: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
