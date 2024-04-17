const User = require('../models/userModel');

const signup = (data) => {
    const user = new User(data);
    return user.save();
};

const getUserByEmail = (email) => {
    return User.findOne({email:email},{_id:0,createdDate:0,updatedDate:0,__v:0})
};

module.exports = {
    signup,
    getUserByEmail,
};

