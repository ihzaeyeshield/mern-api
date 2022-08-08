const {validationResult} = require('express-validator')
const BlogPosti = require('../models/blog')

exports.createBlog=(req,res,next)=>{
    const tittle = req.body.tittle
    // const image = req.body.image
    const body = req.body.body

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('invalid value ya');
        err.errorStatus = 400;
        err.data = errors.array();

        throw err;
    }
    
    const Posting = new BlogPosti({
        tittle: tittle,
        body: body,
        image: "image",
        author: {
            uid: 1,
            name: 'ihza'
        }
    })

    Posting.save()
    .then(result=>{
        res.status(201).json({
            messege: 'Create Blogpost Secussess',
            data: result
        })
    })
   .catch(err=>{
        console.log('err :', err)
    })

    // const result={
    //     messege:'Create Blogpost Succes',
    //     data:{
    //         post_id: 1,
    //         tittle: tittle,
    //         image: image,
    //         body: body,
    //         created_at: "05/08/2022",
    //         author:{
    //             uid: 1,
    //             name: "testing"
    //         }
    //     }
    // }
    // res.status(201).json(result)
}
