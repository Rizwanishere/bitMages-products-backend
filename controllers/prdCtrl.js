const ProductRepo = require('../repositories/prdRepo');

const post = async(req,res) => {
    const payload = req.body;

    try{
        await ProductRepo.post(payload);
        res.status(200).send('Inserted');
    }catch(err){
        res.status(500).send('Internal Server Error');
    }
}


const get = async(req,res) => {
   
    try{
        const data = await ProductRepo.get();
        res.status(200).json(data);
    }catch(err){
        res.status(500).send('Internal Server Error');
    }
}


const getById = async(req,res) => {
    const id = req.params.id;
    const data = await ProductRepo.getById(id);

    if(!id){
        res.status(404).send('Not found');
    }else{
        res.status(200).json(data);
    }
}


const remove = async(req,res) => {

    try{
        const id = req.params.id;
        await ProductRepo.remove(id);
        res.status(204).send();
    }catch(err){
        res.status(500).send('Internal Server Error');
    }
    
}


const put = async(req,res) => {
    
    try{
        const id = req.params.id;
        const payload = req.body;
        await ProductRepo.put(id,payload);
        res.status(204).send();
    }catch(err){
        res.status(500).send('Internal Server Error');
    }    
}
 

const patch = async(req,res) => {
    
    try{
        const id = req.params.id;
        const payload = req.body;
        await ProductRepo.patch(id,payload);
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