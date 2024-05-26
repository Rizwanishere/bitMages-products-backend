const ProductRepo = require('../repositories/prdRepo');
const reviewRepo = require('../repositories/reviewRepo');
const logger = require('../utils/logger');

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
        logger.info('Fetching Products');
        const options = {
            page : req.params.page || 1,
            size : req.params.size || 10,
            search : req.query.search,
            sort : req.query.sort,
            direction : req.query.direction || 'asc',
        }
        

        const data = await ProductRepo.get(options);

        for(let i=0; i<data.length; i++){
            if(data[i].image){
                const protocol = req.protocol;
                const domain = req.get('host');
                data[i].image = `${protocol}://${domain}/${data[i].image}`;
            }
        }
        
        // Pagination Metadata
        const rows = await ProductRepo.getCount(options.search);
        const pages = Math.ceil(rows / options.size);

        const metadata = {
            rows,
            pages
        };

        const response = {
            data,
            metadata
        }

        logger.info('Fetched products');

        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}


const getById = async(req,res) => {
    const id = req.params.id;
    const data = await ProductRepo.getById(id);
    
    if(data.image){
        const protocol = req.protocol;
        const domain = req.get('host');
        data.image = `${protocol}://${domain}/${data.image}`;
    }

    if(!id){
        res.status(404).send('Not found');
    }else{
        const reviews = await reviewRepo.get(id);
        const avgRating = await reviewRepo.getAvgRating(id);
        const Ratings = avgRating.length > 0 ? avgRating[0].avg : undefined;
        const response = {...data._doc,Ratings,reviews};
        res.status(200).json(response);
    }
}

// only admins can delete
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

const addReview = async(req,res) => {
    try{
        const productId = req.params.id;
        const payload = req.body;
        payload.productId = productId;
        payload.createdDate = new Date();
        await reviewRepo.add(payload);
        res.status(201).send('Created');   
    }catch(err){
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    post,
    get,
    getById,
    remove,
    put,
    patch,
    addReview,
}