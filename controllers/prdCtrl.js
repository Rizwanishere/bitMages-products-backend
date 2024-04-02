const Product = require('../models/prdModel');

const post = async(req,res) => {
    const payload = req.body;

    try{
        const product1 = new Product(payload);
        await product1.save();
        res.status(200).send('Inserted');
    }catch(err){
        res.status(500).send('Internal Server Error');
    }
}


const get = async(req,res) => {
   
    try{
        const data = await Product.find({},{__v:0});
        res.status(200).json(data);
    }catch(err){
        res.status(500).send('Internal Server Error');
    }
}


const getById = async(req,res) => {
    const id = req.params.id;
    const data = await Product.findById({_id:id},{__v:0});

    if(!id){
        res.status(404).send('Not found');
    }else{
        res.status(200).json(data);
    }
}


const remove = async(req,res) => {

    try{
        const id = req.params.id;
        await Product.deleteOne({_id:id});
        res.status(204).send();
    }catch(err){
        res.status(500).send('Internal Server Error');
    }
    
}


const put = async(req,res) => {
    
    try{
        const id = req.params.id;
        await Product.updateOne({_id:id},req.body);
        res.status(204).send();
    }catch(err){
        res.status(500).send('Internal Server Error');
    }    
}
 

const patch = async(req,res) => {
    
    try{
        const id = req.params.id;
        await Product.updateOne({_id:id},{$set:req.body});
        res.status(200).send();
    }catch(err){
        res.status(500).send('Internal Server Error');
    }   
}

module.exports = {
    post,
    get,
    getById,
    remove,
    put,
    patch,
}