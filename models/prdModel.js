const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    model: {
        type:String, 
        required: [true,'Model is required']
    },
    brand: {
        type:String, 
        required: [true,'Brand is required']
    },
    price: {
        type:Number,
        required: [true,'Price is required']
    },
    discount: {type:Number},
    inStock: {type:Boolean},
    image: {type: String},
    createdDate: Date,
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

schema.index({ brand: 1, model: 1 });

module.exports = mongoose.model('product',schema);