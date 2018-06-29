const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
  res.status(200).json({
    message: 'Orders were fetched'
  })
});

router.post('/',(req,res,next)=>{
  const order = {
    sneakerId: req.body.sneakerId,
    quantity: req.body.quantity 
  }
  res.status(200).json({
    message: 'Orders was created',
    order
  })
});

router.get('/:orderId',(req,res,next)=>{
  const id = req.param.orderId;
  res.status(200).json({
    message: 'Order details',
    id
  })
});

router.delete('/:orderId',(req,res,next)=>{
  const id = req.param.orderId;
  res.status(200).json({
    message: 'Order deleted',
    id
  })
});

module.exports = router;