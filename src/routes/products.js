const express = require('express');
const router = express.Router();
const productController = require('../controller/products');

router.get('/products',productController.getAllProducts);

router.post('/product',productController.createProducts);


module.exports = router