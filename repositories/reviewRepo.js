const Review = require('../models/reviewModel');

const add = (payload) => {
    const review = new Review(payload);
    return review.save();
};

const get = (productId) => {
    return Review.find({productId:productId},{__v:0,_id:0});
};

module.exports = {
    add,
    get,
};