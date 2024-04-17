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
        
        
        await UserRepo.add(payload);

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

module.exports = {
    signup,
};
