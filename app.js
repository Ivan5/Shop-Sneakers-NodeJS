const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
const sneakerRoutes = require('./api/routes/sneakers');
const orderRoutes = require('./api/routes/orders')
app.use('/sneakers', sneakerRoutes);
app.use('/orders',orderRoutes);

app.use((req,res,next)=>{
  const error = new Error('Not Found');
  error.status(404);
  next(error);
});

app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({error:{
    message: error.mesage
  }});
})
module.exports = app;