const express = require('express');
//deklarasi awal , menggunakan express js
const router = express.Router();
//untuk menggunakan router
const productController = require('../controller/products');
//rujukan produk ke folder controller

router.get('/products',productController.getAllProducts);
//setelah merujuk memilih function yang mana ini get allproducct 

router.post('/product',productController.createProducts);


module.exports = router