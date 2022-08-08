const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const productRoutes = require('./src/routes/products');
//rusukan product router di folder routes 
const authRoute = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog')

app.use(bodyParser.json())
//body parser untuk memparse body dalam bentukjson
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