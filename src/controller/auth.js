exports.register=(req,res,next)=>{
    //req= request, res = response, next untuk lanjut
    const name = req.body.name
    const email = req.body.email
    const password= req.body.password
    //deklarasi ada aja data yang mau diambil atau di post 
    //requst,body,datanya

    const result = {
        message:'Register Succes',
        data:{
            uid:1,
            name: name,
            email: email,
            password: password
        }
    }
    res.status(201).json(result)
    //untuk memberi status dan pasringan data json
}