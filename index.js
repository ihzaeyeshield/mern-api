const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer')

const app = express();
const productRoutes = require('./src/routes/products');
//rujukan product router di folder routes 
const authRoute = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,'./images')
    },
    filename: (req,file,cb)=>{
        cb(null, new Date().getTime()+'-'+file.originalname)
    }
})

const fileFilter=(req, file, cb)=>{
    if( file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

app.use(bodyParser.json())
//body parser untuk memparse body dalam bentukjson
app.use(multer({storage:fileStorage, fileFilter: fileFilter}).single('image'))

app.use('/v1/auth',authRoute);
app.use('/v1/costumer',productRoutes);
//menerima semua method get post put dll
app.use('/v1/blog',blogRoutes)

app.use((error,req,res,next)=>{
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({
        message: message,
        data: data
    })
})

mongoose.connect('mongodb+srv://mernapi:rm7I5vFqSKMAhbXl@cluster0.uipr1ft.mongodb.net/?retryWrites=true&w=majority',
()=>{
    app.listen(4000,()=>console.log('connection succes'));
},e=>console.log(e))


// then(()=>{
//     app.listen(4000,()=>console.log('connection succes'));
//     //ini localhost/4000
// })
// ,catch(err=>console.log(err)));