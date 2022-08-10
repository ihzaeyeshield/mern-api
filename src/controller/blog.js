const {validationResult} = require('express-validator')
const BlogPosti = require('../models/blog')
const path = require ('path')
const fs = require('fs')
//fs fileSystem

exports.createBlog=(req,res,next)=>{

    const errors = validationResult(req);
    //validation result adalah (res)pon dari (req)uest dari model schema

    if(!errors.isEmpty()){
        const err = new Error('invalid value ya');
        err.errorStatus = 400;
        err.data = errors.array();

        throw err;
    }

    if(!req.file){
        const err = new Error('Image Harus di Upload')
        err.errorStatus = 422
        throw err
    }
    

    const tittle = req.body.tittle
    const image = req.file.path
    const body = req.body.body

    const Posting = new BlogPosti({
        tittle: tittle,
        body: body,
        image: image,
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

exports.getAllBlogPost=(req,res,next)=>{
    const currentPage = req.query.page ;
    //query pembatasan cont halaman
    const perPage = req.query.perPage ;
    let totalItem;

    BlogPosti.find()
    .countDocuments()
    //fungsi hitung dokumen
    .then(count=>{
        totalItem = count;
        return BlogPosti.find()
        .skip((currentPage - 1) * perPage)
        //fungsi skip, halaman saat ini -1 x perpage (limit page)
        .limit(perPage);
        //limit
    })
    .then(result=>{
        res.status(200).json({
            messege:'data blogpost berhasil dipanggil',
            data : result,
            total_data: totalItem,
            per_page : parseInt (perPage),
            current_page : parseInt (currentPage),
        })
        //respon yang dikirim
    })
    .catch(err=>{
        next(err);
    })

    // BlogPosti.find()
    // .then(result=>{
    //     res.status(200).json({
    //         messege: 'Data Get Blog berhasil di panggil',
    //         data: result,
    //     })
    // })
    // .catch(err=>{
    //     next(err)
    // })
}

exports.getPostById = (req,res,next)=>{
    const postId = req.params.postId
    //req.params.postId, postId adalah parameter yang didapat dari routes yang dikirim
    BlogPosti.findById(postId)
    .then(result=>{
        if(!result){
            const error = new Error('Blog post Tidak ditemukan')
            error.errorStatus = 404
            throw error
        }
        res.status(200).json({
            messege : "data berhasil dipanggil",
            data: result,

        })
    })
    .catch(err=>{
        next(err)
    })
}

exports.updateBlogPost = (req,res,next)=>{
    const error = validationResult(req)

    if(!error.isEmpty()){
    //jika dari inputan dari validation request ada yang salah maka ini erornya
        const err = new Error('invalid value ya')
        err.errorStatus = 400
        err.data = error.array()
        //errorStatus dan data adalah function

        throw err
    }
    
    if(!req.file){
        const err = new Error('image harus di upload')
        err.errorStatus = 422

        throw err
    }

    const tittle = req.body.tittle
    const image = req.file.path
    const body = req.body.body
    const postId = req.params.postId
    
    BlogPosti.findById(postId)
    .then(post=>{
        if(!post){
            const err = new Error('blog post tidak di temukan')
            err.errorStatus = 404

            throw err
        }

        post.tittle = tittle
        post.image = image
        post.body = body

        return post.save()
    })
    .then(result=>{
        res.status(200).json({
            messege: "update berhasil",
            data: result,
        })
    })
    .catch(err=>{
        next(err)
    })
} 

exports.deleteBlogPost = (req,res,next)=>{
    const postId = req.params.postId
    //mengambil id
    BlogPosti.findById(postId)
    //mencari
    .then(post=>{
        if(!post){
            const error = new Error('blog tidak ditemukan')
            error.errorStatus=404

            throw error
        }
        //eror jika tidak ditemukan
        removeimage(post.image)
        //jika ditemukan removeimage (adalah fungsi nama dan direktori name) dengan parameter post.image(image diambil saat Blogposti.findById(postId))
        return BlogPosti.findByIdAndRemove(postId)
        //ambil atau kembalian nilai dari postid yang telah di remove imagenya
    })
    .then(result=>{
        res.status(200).json({
            messege: 'image berhasil dihapus',
            data:result,
        })
        //data resul di hapus dengan metod di router.delete()
    })
    .catch(err=>{
        next(err)
    })
}

const removeimage=(filePath)=>{
    console.log('filepath : ', filePath)
    console.log('dir name : ',__dirname)

    filePath=path.join(__dirname,'../..', filePath)
    fs.unlink(filePath, err=>console.log(err))
}