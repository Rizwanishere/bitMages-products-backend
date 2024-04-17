const bcrypt = require('bcrypt');
const UserRepo = require('../repositories/userRepo');

const emailExists = (err) => err.message 
    && err.message.indexOf('duplicate key error') > -1;

const signup = async(req,res) => {
    try{
        const payload = req.body;
        payload.password = await bcrypt.hash(payload.password, 2);
        
        console.log('User Added:',payload);
        payload.createdDate = new Date();
        
        
        await UserRepo.signup(payload);

        res.status(201).send('Created');   
    }catch(err){
        console.log(err.message);
        if(emailExists(err)){
            res.status(400).send('Email Already Exists');
        }else{
            res.status(500).send('Internal Server Error');
        }
    }
};

const signin = async(req,res) => {

    const payload = req.body;
    const dbUser = await UserRepo.getUserByEmail(payload.email);

    if(!dbUser){
        res.status(404).send('Invalid Email');
        return;
    }

    const isValid = await bcrypt.compare(payload.password,dbUser.password); 

    if(isValid){
        res.status(200).json({username: dbUser.username});
    }else{
        res.status(401).send('Invalid password');
    }
}

module.exports = {
    signup,
    signin,
};
