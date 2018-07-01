const express = require('express');
const router = express.Router();
const Sneaker = require('../models/sneaker');
const mongoose = require('mongoose');

router.get('/',(req,res)=>{
  Sneaker.find()
    .select('name price _id')
    .exec()
    .then(docs => {
      console.log(docs);
      if(docs.length >= 0){
        const response = {
          count: docs.length,
          sneakers: docs.map(doc => {
            return {
              name: doc.name,
              price: doc.price,
              _id: doc._id,
              url:{
                request:{
                  type: 'GET',
                  url:'http://localhost:3000/sneakers/'+doc._id
                }
              }
            }
          })
        };
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
      message: 'Created sneaker successfully',
      createdSneaker: {
        name: result.name,
        price: result.price,
        _id: result._id,
        request:{
          type:'GET',
          url: 'http://localhost:3000/sneakers/' +result._id
        }
      }
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
    .select('name price _id')
    .exec()
    .then(doc => {
      console.log(doc);
      if(doc){
        res.status(200).json({
          sneaker : doc,
          request:{
            type: 'GET',
            description: 'Get all products',
            url: 'http://localhost:3000/sneakers/'
          }
        })
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
      res.status(200).json({
        message : 'Sneaker updated',
        request:{
          type:'GET',
          url:'http://localhost:3000/sneakers/'+result._id
        }
      })
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
      res.status(200).json({
        message: 'Sneaker deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/sneakers/',
          body: {name:'String', price:'Number'}
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error:err
      })


      
    })
});
module.exports = router;