const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order')

router.get('/',(req,res,next)=>{
  Order.find()
    .select('sneaker quantity _id')
    .populate('sneaker')
    .exec()
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
});

router.post('/',(req,res,next)=>{
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    sneaker: req.body.sneakerId
  });
  order.save()
    .then(result => {
      console.log(result);
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error:err
      })
      
    })
  res.status(200).json({
    message: 'Orders was created',
    order
  })
});

router.get('/:orderId',(req,res,next)=>{
  Order.findById(req.params.orderId)
    .populate('sneaker')
    .exec()
    .then(order => {
      res.status(200).json({
        order: order
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
});

router.delete('/:orderId',(req,res,next)=>{
  Order.remove({_id: req.params.orderId}).exec()
    .then(result => {
      message: 'Order deleted'
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
});

module.exports = router;