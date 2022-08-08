const express = require('express')
//require deklarasi awal
const router =express.Router()
//untuk route pada folder route
const authController = require('../controller/auth')
//mengambil modul contoller di folder kontroler/auth

router.post('/register',authController.register)
//cara post ke end poin "/register" dan di targetkan ke folder controller/auth

module.exports= router
//cara export