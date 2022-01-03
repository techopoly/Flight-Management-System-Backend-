const jwt = require('jsonwebtoken');




module.exports= (req,res,next)=>{
    const token =   req.get('Authorization').split(' ')[1];
    let decodedToken

    try{
        decodedToken = jwt.verify(token, 'privatekey')
    }catch(err){
        console.log(err)
    }
    if(!decodedToken){
        console.log('not authenticated')
    }

    req.userId = decodedToken.email;
    next()
}