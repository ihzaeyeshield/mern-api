exports.createProducts = (req,res,next)=>{
    res.json(
        {
            message:'create product',
            data: {
                id:1,
                name:'Bear Brand',
                price:10000
            }
        }
    );
    next();
}

exports.getAllProducts = (req,res,next)=>{
    res.json(
        {
            message:'Get All Product',
            data: {
                id:1,
                name:'Bear Brand',
                price:10000
            }
        }
    );
    next();
}