const UserRepo = require('../repositories/userRepo');

const emailExists = (err) => err.message 
    && err.message.indexOf('duplicate key error') > -1;

const add = async(req,res) => {
    try{
        const payload = req.body;
        payload.createdDate = new Date();
        console.log('User Added:',payload);
        
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
    add,
};
