const Review = require('../models/reviewModel');

const add = (payload) => {
    const review = new Review(payload);
    return review.save();
};

const get = (productId) => {
    return Review.find({productId:productId},{__v:0,_id:0});
};

const getAvgRating = (productId) => {
    return Review.aggregate(
        [
            {$match: {productId:productId}},
            {$group: {_id:'$productId',avg:{$avg:'$rating'}}}
        ]
    );
};

module.exports = {
    add,
    get,
    getAvgRating
};