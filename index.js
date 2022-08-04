const express = require('express');
const app = express();
const productController = require('./src/routes/products');

app.use('/',productController);

app.listen(4000);