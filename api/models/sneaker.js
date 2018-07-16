const mongoose = require('mongoose')

const sneakerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: {type: Number, required: true},
  image: String
});


module.exports = mongoose.model('Sneaker',sneakerSchema);
