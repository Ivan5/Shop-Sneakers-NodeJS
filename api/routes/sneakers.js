const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
  res.status(200).json({
    message: 'Handling GET resques to /products'
  });
});

router.post('/',(req,res)=>{
  const sneaker = {
    name: req.body.name,
    price: req.body.price
  }
  res.status(200).json({
    message: 'Handling Post resques to /products',
    createdSneaker: sneaker
  });
});

router.get('/:sneakerId',(req,res,next)=>{
  const id = req.params.sneakerId;
  if(id === 'special'){
    res.status(200).json({
      message: 'You discover the special id',
      id
    })
  }else{
    res.status(200).json({
      message:'You assed an ID'
    })
  }
});

router.patch('/:sneakerId',(req,res,next)=>{
  res.status(200).json({
    message: 'Updated sneaker'
  });
});

router.delete('/:sneakerId',(req,res,next)=>{
  res.status(200).json({
    message: 'Delete sneaker'
  });
});
module.exports = router;