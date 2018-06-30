const express = require('express');
const router = express.Router();
const Sneaker = require('../models/sneaker');
const mongoose = require('mongoose');

router.get('/',(req,res)=>{
  Sneaker.find().exec()
    .then(docs => {
      console.log(docs);
      if(docs.length >= 0){
        res.status(200).json(docs);
      }else{
        res.status(404).json({
          message : 'No entries found'
        });
      }
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
});

router.post('/',(req,res)=>{
  const sneaker = new Sneaker({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  sneaker.save().then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Handling Post resques to /products',
      createdSneaker: result
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error:err
    })
  });
  
});

router.get('/:sneakerId',(req,res,next)=>{
  const id = req.params.sneakerId;
  Sneaker.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if(doc){
        res.status(200).json(doc)
      }else{
        res.status(404).json({message: '¿Novalid entry found for provided ID'});
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error:MediaStreamErrorEvent})
    });
});

router.patch('/:sneakerId',(req,res,next)=>{
  const id = req.params.sneakerId;
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  Sneaker.update({_id:id},{$set: updateOps}).exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
});

router.delete('/:sneakerId',(req,res,next)=>{
  const id = req.params.sneakerId;
  Sneaker.remove({_id: id}).exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error:err
      })


      
    })
});
module.exports = router;