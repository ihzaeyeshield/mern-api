const express = require('express');
const {body} = require('express-validator')
const router = express.Router();

const blogController = require('../controller/blog');

router.post('/createblog',[
    body('tittle').isLength({min:5}).withMessage('tittle tidak sesuai: minimum 5 hutuf'),
    body('body').isLength({min:5}).withMessage('body tidak sesuai')
    ],blogController.createBlog);

router.get('/post', blogController.getAllBlogPost)

module.exports = router;