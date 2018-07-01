const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sneaker: {type: mongoose.Schema.Types.ObjectId, ref: 'Sneaker', required: true},
  quantity:{ type: Number, required: true}
  
});


module.exports = mongoose.model('Order',orderSchema);
