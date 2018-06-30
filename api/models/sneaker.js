const mongoose = require('mongoose')

const sneakerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number
});


module.exports = mongoose.model('Sneaker',sneakerSchema);
