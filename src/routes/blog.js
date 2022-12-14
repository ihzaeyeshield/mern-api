const express = require('express');
const {body} = require('express-validator')
const router = express.Router();

const blogController = require('../controller/blog');

router.post('/createblog',[
    body('tittle').isLength({min:5}).withMessage('tittle tidak sesuai: minimum 5 hutuf'),
    body('body').isLength({min:5}).withMessage('body tidak sesuai')
    ],blogController.createBlog);
//post dan pembatasan limit huruf

router.get('/post', blogController.getAllBlogPost)
//contoh param /post?curentPage=2&limitpage=3

router.get('/post/:postId', blogController.getPostById)
///:postId adalah parameter bukan nama string

router.put('/post/:postId',blogController.updateBlogPost)

router.delete('/post/:postId',blogController.deleteBlogPost)

module.exports = router;