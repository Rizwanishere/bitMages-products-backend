const Review = require('../models/reviewModel');

const add = (payload) =>{
    const review = new Review(payload);
    return review.save();
}

module.exports = {
    add,
}