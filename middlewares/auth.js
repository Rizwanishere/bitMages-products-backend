const jwt = require('jsonwebtoken');
const config = require('../config/index');

function basicAuth(req,res,next) {
    const authHeader = req.headers.authorization;

    console.log(authHeader);    // Basic YWRtaW46cGFzc3dvcmQ=
    
    if(!authHeader){
        res.status(404).send('Unauthorized');
    }

    const authToken = authHeader.split(' ');    // [ 'Basic', 'YWRtaW46cGFzc3dvcmQ=' ]

    const buf = Buffer.from(authToken[1], 'base64'); // 'YWRtaW46cGFzc3dvcmQ=' --> <Buffer 61 64 6d 69 6e 3a 70 61 73 73 77 6f 72 64>   

    const decoded = buf.toString();      // admin:password
    
    const tokens = decoded.split(':');      // [ 'admin', 'password' ]

    const [username, password] = tokens;    // username = 'admin' & password = 'password'
    
    if(username === 'admin' && password === 'password'){
        next();
    }else{
        res.status(401).send('Unauthorized');
    }
}

function tokenAuth(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(401).send('Unauthorized');
    }

   const tokens = authHeader.split(' ');
   const authToken = tokens[1];
   
   jwt.verify(authToken,config.jwtSecret,(err,decoded) => {
   if(err){
            res.status(401).send('Unauthorized');
        }else{
            req.role = decoded.role;
            console.log(decoded);
            next();
        } 
   });
}

function authorizeAdmin(req,res,next){
    if(req.role === 'Admin'){
        next();
    }else{
        res.status(401).send('Forbidden');
    }
}

module.exports = {
    // basicAuth,
    tokenAuth,
    authorizeAdmin,
}