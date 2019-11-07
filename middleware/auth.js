const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token,'merastudentkasectret');
    }
    catch(err){
        res.status(500).json({message:"Some error occured from the server side"}); 
    }    
    if(!decodedToken) {
        res.status(401).json({message:"Unauthorized"});
    }
    req.email = decodedToken.email;
    next();
}