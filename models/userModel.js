const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String, unique: true},
    active: {type: Boolean, default: true},
    createdDate: {type: Date},
    updatedDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('users',schema);