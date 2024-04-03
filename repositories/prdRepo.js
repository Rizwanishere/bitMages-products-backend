const Product = require('../models/prdModel');


const post = (payload) =>{
    const product1 = new Product(payload);
    return product1.save();
}

const get = (currentPage,size) => {
    const rowsToSkip = (currentPage - 1) * size;
    
    return Product
    .find({},{__v:0})
    .skip(rowsToSkip)
    .limit(size)
}

const getById = (id) => {
    return Product.findById(id,{__v:0});   
}

const remove = (id) => {
    return Product.deleteOne({_id:id});
}

const put = (id,payload) => {
    return Product.updateOne({_id:id},payload);
}

const patch = (id,payload) => {
    return Product.updateOne({_id:id},{$set:payload});
}

module.exports = {
    post,
    get,
    getById,
    remove,
    put,
    patch,
}