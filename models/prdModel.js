const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    model: {type:String},
    brand: {type:String},
    price: {type:Number},
    discount: {type:Number},
    inStock: {type:String},
    createdDate: Date,
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('product',schema)