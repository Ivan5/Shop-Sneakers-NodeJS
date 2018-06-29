const express = require('express');
const app = express();

const sneakerRoutes = require('./api/routes/sneakers');
const orderRoutes = require('./api/routes/orders')
app.use('/sneakers', sneakerRoutes);
app.use('/orders',orderRoutes);
module.exports = app;