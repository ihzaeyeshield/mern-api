exports.createProducts = (req,res,next)=>{
    const nama =req.body.name;
    const price = req.body.price;

    res.json(
        {
            message:'create product',
            data: {
                id:1,
                name:nama,
                price:price
            }
        }
    );
    next();
}
//pembuatan format json untuk saling bertukan data

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